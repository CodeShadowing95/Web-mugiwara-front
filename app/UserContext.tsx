'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

interface UserContextType {
  currentUser: any;
  refreshUser: (forceRefresh?: boolean) => Promise<void>;
  setCurrentUser: (user: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    toast.error("useUser doit être utilisé dans UserProvider");
    return null;
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initialiser currentUser depuis localStorage au montage
    const userInStorage = localStorage.getItem("user");
    if (userInStorage) {
      try {
        const parsedUser = JSON.parse(userInStorage);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Erreur lors de la lecture de l'utilisateur depuis localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const refreshUser = useCallback(async (forceRefresh: boolean = false) => {
    if (!isClient) return;
    
    const token = localStorage.getItem("jwt_token");
    const userInStorage = localStorage.getItem("user");
    
    if (!forceRefresh && userInStorage) {
      try {
        const parsedUser = JSON.parse(userInStorage);
        setCurrentUser(parsedUser);
        return;
      } catch {
        localStorage.removeItem("user");
      }
    }

    if (!token) {
      setCurrentUser(null);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données utilisateur");
      }

      const userData = await response.json();
      localStorage.setItem("user", JSON.stringify(userData));
      setCurrentUser(userData);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement de l'utilisateur:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("jwt_token");
      setCurrentUser(null);
    }
  }, [isClient]);

  const handleSetCurrentUser = useCallback((user: any) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        refreshUser,
        setCurrentUser: handleSetCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
