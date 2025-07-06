import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "./UserContext";

interface CartItem {
  id: number;
  product: any;
  quantity: number;
  subtotal: number;
}

interface Cart {
  id: number;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
  removeCartItem: (itemId: number) => Promise<void>;
  validateCart: () => Promise<any>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { currentUser } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getToken = () => {
    if (!isClient) return null;
    return localStorage.getItem("jwt_token");
  };

  const checkUserRole = () => {
    if (!currentUser) throw new Error("Non authentifié");
    if (currentUser.role === "ROLE_FARMER") throw new Error("Les fermiers n'ont pas accès au panier");
  };

  const fetchCart = async () => {
    if (!isClient) return;
    setLoading(true);
    setError(null);
    try {
      checkUserRole();
      const token = getToken();
      if (!token) throw new Error("Non authentifié");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors de la récupération du panier");
      const data = await res.json();
      setCart(data);
    } catch (e: any) {
      setError(e.message);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    if (!isClient) return;
    setLoading(true);
    setError(null);
    try {
      checkUserRole();
      const token = getToken();
      if (!token) throw new Error("Non authentifié");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'ajout au panier");
      await fetchCart();
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId: number, quantity: number) => {
    if (!isClient) return;
    setLoading(true);
    setError(null);
    try {
      checkUserRole();
      const token = getToken();
      if (!token) throw new Error("Non authentifié");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de la mise à jour");
      await fetchCart();
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (itemId: number) => {
    if (!isClient) return;
    setLoading(true);
    setError(null);
    try {
      checkUserRole();
      const token = getToken();
      if (!token) throw new Error("Non authentifié");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/items/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de la suppression");
      await fetchCart();
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const validateCart = async () => {
    if (!isClient) return;
    setLoading(true);
    setError(null);
    try {
      checkUserRole();
      const token = getToken();
      if (!token) throw new Error("Non authentifié");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/validate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de la validation");
      setCart(null); // Le panier est vidé après validation
      return data;
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isClient && !currentUser?.role) {
      fetchCart();
    }
  }, [isClient]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        fetchCart,
        addToCart,
        updateCartItem,
        removeCartItem,
        validateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};