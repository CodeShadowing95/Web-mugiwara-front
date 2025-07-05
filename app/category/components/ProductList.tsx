"use client";
import Link from "next/link";
import { Star, Leaf, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, Tag } from "@/types";
import React, { useState } from "react";
import { useLocation } from "@/app/LocationContext";
import { haversineDistance } from "@/utils/utilities";
import { useCart } from "@/context/CartContext";
import Toast from "@/app-components/Toast";
import { useRouter } from "next/navigation";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string;
  title?: string;
}

const PRODUCTS_PER_PAGE = 6;

const ProductList: React.FC<ProductListProps> = ({ products, loading, error, title = "Tous nos produits" }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil((products?.length || 0) / PRODUCTS_PER_PAGE);

  const { lat: userLat, lng: userLng } = useLocation();
  const { addToCart, loading: cartLoading } = useCart();
  const [toastData, setToastData] = useState<any>(null);
  const [addingId, setAddingId] = useState<number | null>(null);
  const router = useRouter();

  type ProductWithDistance = Product & { distance: number | null };
  const sortedProducts: ProductWithDistance[] = userLat !== null && userLng !== null && products
    ? [...products].map(product => {
        let distance = null;
        if (product.farm && product.farm.coordinates && product.farm.coordinates.lat && product.farm.coordinates.lng) {
          distance = haversineDistance(
            userLat,
            userLng,
            parseFloat(product.farm.coordinates.lat),
            parseFloat(product.farm.coordinates.lng)
          );
        }
        return { ...product, distance };
      })
      .sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return (a.distance ?? 0) - (b.distance ?? 0);
      })
    : products as ProductWithDistance[];

  const paginatedProducts = sortedProducts?.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE) || [];

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const handlePage = (p: number) => setPage(p);

  const handleAddToCart = async (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAddingId(product.id);
    // DEBUG: log du token
    if (typeof window !== "undefined") {
      console.log("TOKEN:", localStorage.getItem("token"));
    }
    try {
      await addToCart(product.id, 1);
      setToastData({
        title: "Ajouté au panier !",
        description: `${product.name} a été ajouté à votre panier.`,
        className: "bg-green-50 dark:bg-emerald-900/30",
        icon: <ShoppingCart className="text-green-600 dark:text-emerald-400" />,
      });
    } catch (e: any) {
      setToastData({
        title: "Erreur",
        description: e.message || "Impossible d'ajouter au panier.",
        className: "bg-red-50 dark:bg-red-900/30",
        icon: <ShoppingCart className="text-red-600 dark:text-red-400" />,
      });
      if (e.message === "Non authentifié") {
        setTimeout(() => {
          router.push("/login");
        }, 1200);
      }
    } finally {
      setAddingId(null);
    }
  };

  React.useEffect(() => {
    setPage(1); // reset page if products change
  }, [products]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#3c5a3e] dark:text-zinc-100">
          {title}
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[#5a7052] dark:text-zinc-300">Trier par:</span>
          <select className="text-sm border border-[#e8e1d4] dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 px-2 py-1 text-[#5a7052] dark:text-zinc-300">
            <option>Popularité</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Nouveautés</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-8">Chargement...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : paginatedProducts && paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedProducts.map((produit) => (
            <Link
              href={`/product/${produit.id}`}
              key={produit.id}
              className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-[#e8e1d4] dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow relative group"
            >
              {/* Affichage des tags */}
              {produit.tags && Array.isArray(produit.tags) && produit.tags.length > 0 && (
                <div className="absolute top-3 left-3 flex gap-2 z-10">
                  {produit.tags.map((tag: Tag, idx: number) => (
                    <span
                      key={tag.id || tag.name + idx}
                      style={{ backgroundColor: tag.bgColor, color: tag.textColor }}
                      className="text-xs px-2 py-0.5 rounded-full flex items-center"
                    >
                      <Leaf size={10} className="mr-0.5" />
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              <div className="relative mb-3 bg-[#f7f4eb] dark:bg-zinc-800 rounded-lg p-4 flex items-center justify-center h-48">
                <img
                  src={(() => {
                    if (Array.isArray(produit.medias)) {
                      const img = produit.medias.find((m: any) => m.mediaType?.slug === "image" && m.publicPath);
                      if (img && typeof img.publicPath === "string") {
                        return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/${img.publicPath.replace(/^public\//, "")}`;
                      }
                    }
                    return "/imgs/vegetable.png";
                  })()}
                  alt={produit.name}
                  className="h-48 w-48 object-contain transition-transform group-hover:scale-105"
                />
                <button className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white dark:bg-zinc-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-[#5a7052] dark:text-zinc-100 hover:text-[#3c5a3e] dark:hover:text-zinc-500">
                  <span><svg width="16" height="16"><path d="M8 2C5.243 2 3 4.243 3 7c0 3.25 4.5 7 4.5 7s4.5-3.75 4.5-7c0-2.757-2.243-5-5-5z" fill="#e25555"/></svg></span>
                </button>
              </div>
              <div className="mb-2">
                <div className="flex items-center text-[#e4a14e] dark:text-amber-400 mb-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>
                        <Star size={14} className="text-gray-300 dark:text-zinc-600" />
                      </span>
                    ))}
                  <span className="text-xs text-[#5a7052] dark:text-zinc-100 ml-1">
                    (0)
                  </span>
                </div>
                <h3 className="font-medium text-[#3c5a3e] dark:text-zinc-100">
                  {produit.name}
                </h3>
                {userLat !== null && userLng !== null && (produit as ProductWithDistance).distance !== null && (
                  <div className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#8fb573] text-white text-xs font-semibold shadow-sm">
                    {(produit as ProductWithDistance).distance!.toFixed(1)} km de vous
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-[#3c5a3e] dark:text-zinc-100">
                  {produit.price?.toFixed(2) || "-"} €
                </span>
                <Button
                  size="sm"
                  className="bg-[#8fb573] hover:bg-[#7a9c62] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
                  onClick={(e) => handleAddToCart(produit, e)}
                  disabled={addingId === produit.id || produit.stock === 0}
                >
                  <ShoppingCart size={14} className="mr-1" />
                  {addingId === produit.id ? "Ajout..." : "Ajouter"}
                </Button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-[#5a7052] dark:text-zinc-200 text-lg py-8">
          Aucun produit à afficher.
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-1">
            <button
              className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-zinc-800 border border-[#e8e1d4] dark:border-zinc-700 text-[#5a7052] dark:text-zinc-400 hover:bg-[#f7f4eb] dark:hover:bg-zinc-700 transition-colors"
              onClick={handlePrev}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`w-8 h-8 flex items-center justify-center rounded ${page === i + 1 ? 'bg-[#8fb573] dark:bg-emerald-600 text-white font-medium' : 'bg-white dark:bg-zinc-800 border border-[#e8e1d4] dark:border-zinc-700 text-[#5a7052] dark:text-zinc-400 hover:bg-[#f7f4eb] dark:hover:bg-zinc-700 transition-colors'}`}
                onClick={() => handlePage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-zinc-800 border border-[#e8e1d4] dark:border-zinc-700 text-[#5a7052] dark:text-zinc-400 hover:bg-[#f7f4eb] dark:hover:bg-zinc-700 transition-colors"
              onClick={handleNext}
              disabled={page === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
      {toastData && (
        <Toast {...toastData} />
      )}
    </div>
  );
};

export default ProductList; 