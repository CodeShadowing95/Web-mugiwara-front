"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  StarHalf,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Heart,
  Home,
  Leaf,
  Apple,
  Carrot,
  Truck,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {getCategoryById, getCategoryParents, getProductsByCategory} from "@/lib/productCategory";
import {Category, Product, Tag} from "@/types";
import FeaturedProductCard from "@/app-components/Home/FeaturedProductCard";
import Breadcrumb, { BreadcrumbItem } from "@/app-components/Breadcrumb";
import CategoryFilters from "./components/CategoryFilters";
import CategoryHeader from "./components/CategoryHeader";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductList from "./components/ProductList";
import DeliveryBanner from "./components/DeliveryBanner";

export default function CategoryPage() {
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const item = searchParams.get("item") ?? "1";
  const query = searchParams.get("q") ?? "produits-de-saison";
  const sort = searchParams.get("sort");
  const filters = {
    bio: searchParams.get("bio") === "true",
    local: searchParams.get("local") === "true",
    price_min: searchParams.get("price_min"),
    price_max: searchParams.get("price_max"),
    season: searchParams.get("season"),
  };

  const [parentsCategory, setParentsCategory] = useState<Category[] | []>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filtersOpen, setFiltersOpen] = useState({
    saison: true,
    provenance: true,
    prix: true,
    bio: true,
  });

  const toggleFilter = (filter: string) => {
    setFiltersOpen((prev: any) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const fetchCategory = async () => {
    setError("");
    try {
      const data = await getCategoryById(item);
      setCategory(data);
    } catch (err: any) {
      setError("Erreur lors du chargement de la catégorie.");
    }
  };

  const fetchCategoryParents = async () => {
    setError("");
    try {
      const data = await getCategoryParents(item);
      setParentsCategory(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError("Erreur lors du chargement des parents de la categorie.");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getProductsByCategory(item);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError("Erreur lors du chargement des produits.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProducts();
    void fetchCategory();
    void fetchCategoryParents();
  }, [item, query]);

  const featuredProducts = products.filter(
    (product) => product.featured
  );
  const listedProducts = products.filter(
    (product) => !product.featured
  );

  return (
    <div className="min-h-screen bg-[#f9f7f2] dark:bg-zinc-950">
      {/* Fil d'Ariane */}
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/", icon: <Home size={14} className="mr-1" /> },
          ...(
            parentsCategory && parentsCategory.length > 0
              ? parentsCategory.map((parent: any) => ({
                  label: parent.name,
                  href: `/category?item=${parent.id}`
                }))
              : []
          ),
          { label: category?.name || "..." }
        ]}
        className="max-w-7xl mx-auto px-4 md:px-8 py-3 text-sm text-[#5a7052] dark:text-zinc-100 flex items-center"
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtres */}
          <aside className="md:w-64 flex-shrink-0">
            <CategoryFilters filtersOpen={filtersOpen} toggleFilter={toggleFilter} />
          </aside>

          {/* Contenu principal */}
          <div className="flex-1">
            {/* En-tête de catégorie */}
            <CategoryHeader category={category} />
            {/* Produits mis en avant */}
            <FeaturedProducts products={featuredProducts} loading={loading} error={error} />
            {/* Tous les produits */}
            <ProductList products={listedProducts} loading={loading} error={error} />
            {featuredProducts.length === 0 && listedProducts.length === 0 && (
              <div className="text-center text-[#5a7052] dark:text-zinc-200 text-lg py-16">
                Aucun produit disponible pour cette catégorie.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bannière livraison */}
      <DeliveryBanner />
    </div>
  );
}
