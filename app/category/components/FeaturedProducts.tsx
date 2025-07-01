import { ChevronLeft, ChevronRight } from "lucide-react";
import FeaturedProductCard from "@/app-components/Home/FeaturedProductCard";
import { Product } from "@/types";
import React from "react";

interface FeaturedProductsProps {
  products: Product[];
  loading: boolean;
  error: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, loading, error }) => {
  if (!products || products.length === 0) return null;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#3c5a3e] dark:text-zinc-100">
          Meilleures ventes
        </h2>
        <div className="flex space-x-2">
          <button className="p-1.5 rounded-full bg-white dark:bg-zinc-800 border border-[#e8e1d4] dark:border-zinc-700 text-[#5a7052] dark:text-zinc-100 hover:bg-[#f7f4eb] dark:hover:bg-zinc-700">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1.5 rounded-full bg-white dark:bg-zinc-800 border border-[#e8e1d4] dark:border-zinc-700 text-[#5a7052] dark:text-zinc-100 hover:bg-[#f7f4eb] dark:hover:bg-zinc-700">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-8">Chargement...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((produit) => (
            <FeaturedProductCard key={produit.id} product={produit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts; 