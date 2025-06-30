import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { Product } from "@/types";

interface FeaturedProductCardProps {
  product: Product;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ product }) => {
  if (!product) return null;
  return (
    <div className="relative flex flex-col md:flex-row items-center bg-gradient-to-br from-farm-green-light/60 to-farm-orange/60 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border-2 border-farm-orange/40 dark:border-farm-green-dark p-4 md:p-6 min-h-[180px] overflow-hidden group">
      {/* Badge "Coup de cœur" */}
      {product.featured && (
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-farm-orange text-white px-3 py-1 text-xs font-bold shadow uppercase tracking-wider">Coup de cœur</Badge>
        </div>
      )}
      {/* Image produit */}
      <Link href={`/product/${product.id}`} className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-xl overflow-hidden shadow border border-farm-green-light dark:border-farm-green-dark group-hover:scale-105 transition-transform duration-300">
        <Image
          src={(() => {
            if (Array.isArray(product.medias)) {
              const img = product.medias.find((m: any) => m.mediaType?.slug === "image" && m.publicPath);
              if (img && typeof img.publicPath === "string") {
                return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/${img.publicPath.replace(/^public\//, "")}`;
              }
            }
            return "/vegetable.png";
          })()}
          alt={product.name}
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
      {/* Infos produit */}
      <div className="flex-1 flex flex-col justify-center md:pl-6 mt-4 md:mt-0 z-10">
        <div className="flex flex-wrap gap-2 mb-2">
          {product.tags?.map((tag, idx) => (
            <Badge key={idx} style={tag.bgColor ? { backgroundColor: tag.bgColor, color: tag.textColor } : {}}>
              {tag.name}
            </Badge>
          ))}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-farm-green-dark dark:text-white mb-1 line-clamp-2">
          {product.name}
        </h2>
        {Array.isArray(product.categories) && product.categories.length > 0 && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {product.categories.map((cat, i, arr) => (
              <span key={cat.id || i}>
                {cat.name}{i < arr.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}
        {product.farm && (
          <div className="text-xs text-farm-green dark:text-gray-400 mb-1 font-medium">
            Producteur : {product.farm.name}
          </div>
        )}
        <div className="flex items-center gap-4 mt-2">
          <div>
            <span className="font-bold text-farm-green-dark dark:text-white text-lg md:text-xl">{product.price.toFixed(2)} €</span>
            <span className="text-xs text-farm-green dark:text-gray-400 ml-2">{product.unitPrice} / {product.unity?.name}</span>
          </div>
          {/*{typeof product.rating === 'number' && (
            <div className="flex items-center text-farm-orange bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded-full shadow text-base font-bold">
              <Star size={16} className="fill-farm-orange mr-1" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}*/}
        </div>
        <Link href={`/product/${product.id}`} className="inline-block mt-4 px-5 py-2 rounded-lg bg-farm-orange text-white font-bold text-sm shadow hover:bg-farm-green-dark transition-colors w-fit">
          Découvrir
        </Link>
      </div>
      {/* Décorations visuelles plus discrètes */}
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-farm-orange/10 rounded-full z-0" />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-56 h-12 bg-farm-green-light/10 rounded-full z-0" />
    </div>
  );
};

export default FeaturedProductCard;
