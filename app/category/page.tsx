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
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 text-sm text-[#5a7052] dark:text-zinc-100 flex items-center space-x-2">
        <Link href="/" className="hover:underline flex items-center">
          <Home size={14} className="mr-1" />
          Accueil
        </Link>
        {parentsCategory && parentsCategory.length > 0 && parentsCategory.map((parent, idx) => (
          <>
            <ChevronRight size={14} key={`chevron-${parent.id}`}/>
            <Link
              key={parent.id}
              href={`/category?item=${parent.id}`}
              className="hover:underline"
            >
              {parent.name}
            </Link>
          </>
        ))}
        <ChevronRight size={14} />
        <span className="font-medium">
          {category?.name || "..."}
        </span>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtres */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-[#e8e1d4] dark:border-zinc-700 mb-4">
              <h2 className="font-bold text-[#3c5a3e] dark:text-zinc-100 text-lg mb-4">
                Affiner par
              </h2>

              {/* Filter sections with updated colors */}
              <div className="mb-4 border-b border-[#e8e1d4] dark:border-zinc-700 pb-3">
                <button
                  className="w-full flex items-center justify-between font-medium text-[#3c5a3e] dark:text-zinc-100 mb-2"
                  onClick={() => toggleFilter("saison")}
                >
                  Saison
                  {filtersOpen.saison ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {filtersOpen.saison && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saison-printemps"
                        className="border-[#e8e1d4] dark:border-zinc-700"
                      />
                      <label
                        htmlFor="saison-printemps"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400"
                      >
                        Printemps
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="saison-ete" defaultChecked />
                      <label
                        htmlFor="saison-ete"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400"
                      >
                        Été (en cours)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="saison-automne" />
                      <label
                        htmlFor="saison-automne"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400"
                      >
                        Automne
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="saison-hiver" />
                      <label
                        htmlFor="saison-hiver"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400"
                      >
                        Hiver
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Filtre provenance */}
              <div className="mb-4 border-b border-[#e8e1d4] pb-3">
                <button
                  className="w-full flex items-center justify-between font-medium text-[#3c5a3e] dark:text-zinc-100 mb-2"
                  onClick={() => toggleFilter("provenance")}
                >
                  Provenance
                  {filtersOpen.provenance ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {filtersOpen.provenance && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="local" defaultChecked />
                      <label
                        htmlFor="local"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400"
                      >
                        Local (&lt;50km)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="regional" />
                      <label
                        htmlFor="regional"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400"
                      >
                        Régional
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="france" />
                      <label
                        htmlFor="france"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400"
                      >
                        France
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Filtre prix */}
              <div className="mb-4 border-b border-[#e8e1d4] pb-3">
                <button
                  className="w-full flex items-center justify-between font-medium text-[#3c5a3e] dark:text-zinc-100 mb-2"
                  onClick={() => toggleFilter("prix")}
                >
                  Prix
                  {filtersOpen.prix ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {filtersOpen.prix && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="prix-1" />
                      <label
                        htmlFor="prix-1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400"
                      >
                        Moins de 3€
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="prix-2" defaultChecked />
                      <label
                        htmlFor="prix-2"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400"
                      >
                        3€ à 5€
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="prix-3" />
                      <label
                        htmlFor="prix-3"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400"
                      >
                        5€ à 10€
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="prix-4" />
                      <label
                        htmlFor="prix-4"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400"
                      >
                        Plus de 10€
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Filtre bio */}
              <div className="mb-4">
                <button
                  className="w-full flex items-center justify-between font-medium text-[#3c5a3e] dark:text-zinc-100 mb-2"
                  onClick={() => toggleFilter("bio")}
                >
                  Certification
                  {filtersOpen.bio ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                {filtersOpen.bio && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bio" defaultChecked />
                      <label
                        htmlFor="bio"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400 flex items-center"
                      >
                        <Leaf size={14} className="mr-1 text-[#8fb573]" />
                        Agriculture Biologique
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hve" />
                      <label
                        htmlFor="hve"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400"
                      >
                        Haute Valeur Environnementale
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Avantages */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start space-x-2 text-[#5a7052] dark:text-zinc-400">
                  <Truck size={18} className="mt-0.5 text-[#8fb573]" />
                  <div className="text-sm">
                    <p className="font-medium">Livraison gratuite</p>
                    <p className="text-xs">à partir de 35€ d'achat</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 text-[#5a7052] dark:text-zinc-400">
                  <Clock size={18} className="mt-0.5 text-[#8fb573]" />
                  <div className="text-sm">
                    <p className="font-medium">Fraîcheur garantie</p>
                    <p className="text-xs">Récolté à maturité</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Contenu principal */}
          <div className="flex-1">
            {/* En-tête de catégorie */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-[#e8e1d4] dark:border-zinc-800 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-[#3c5a3e] dark:text-zinc-100 mb-2 flex items-center">
                <span className="mr-2 text-[#8fb573] dark:text-emerald-400">
                  <Apple size={24} className="inline mr-1" />
                  <Carrot size={24} className="inline" />
                </span>
                {category?.name || "..."}
              </h1>
              <p className="text-[#5a7052] dark:text-zinc-500 mb-4">
                {category?.description || "..."}
              </p>
              <div className="flex flex-wrap gap-2">
                {category?.children?.map((child) => {
                    return (
                        <Link
                        key={child.id}
                        href={`/category?item=${child.id}`}
                        className="bg-[#f7f4eb] dark:bg-zinc-800 text-[#5a7052] dark:text-zinc-100 px-3 py-1 rounded-full text-sm font-medium hover:bg-[#e8e1d4] dark:hover:bg-zinc-700 transition-colors"
                        >
                        {child.name}
                        </Link>
                    );
                })}
              </div>
            </div>

            {/* Produits mis en avant */}
            {featuredProducts.length > 0 && (
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
                    {featuredProducts.map((produit) => (
                      <FeaturedProductCard key={produit.id} product={produit} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tous les produits */}
            {listedProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#3c5a3e] dark:text-zinc-100">
                    Tous nos produits
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-[#5a7052] dark:text-zinc-300">
                      Trier par:
                    </span>
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
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {listedProducts.map((produit) => (
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
                              return "/vegetable.png";
                            })()}
                            alt={produit.name}
                            className="h-48 w-48 object-contain transition-transform group-hover:scale-105"
                          />
                          <button className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white dark:bg-zinc-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-[#5a7052] dark:text-zinc-100 hover:text-[#3c5a3e] dark:hover:text-zinc-500">
                            <Heart size={16} />
                          </button>
                        </div>
                        <div className="mb-2">
                          <div className="flex items-center text-[#e4a14e] dark:text-amber-400 mb-1">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <span key={i}>
                                  {i < 0 ? (
                                    <Star size={14} className="fill-current" />
                                  ) : (
                                    <Star
                                      size={14}
                                      className="text-gray-300 dark:text-zinc-600"
                                    />
                                  )}
                                </span>
                              ))}
                          <span className="text-xs text-[#5a7052] dark:text-zinc-100 ml-1">
                            (0)
                          </span>
                          </div>
                          <h3 className="font-medium text-[#3c5a3e] dark:text-zinc-100">
                            {produit.name}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-bold text-[#3c5a3e] dark:text-zinc-100">
                            {produit.price?.toFixed(2) || "-"} €
                          </span>
                          <Button
                            size="sm"
                            className="bg-[#8fb573] hover:bg-[#7a9c62] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
                          >
                            <ShoppingCart size={14} className="mr-1" />
                            Ajouter
                          </Button>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-zinc-800 border border-[#e8e1d4] dark:border-zinc-700 text-[#5a7052] dark:text-zinc-400 hover:bg-[#f7f4eb] dark:hover:bg-zinc-700 transition-colors">
                      <ChevronLeft size={16} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded bg-[#8fb573] dark:bg-emerald-600 text-white font-medium transition-colors">
                      1
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-zinc-800 border border-[#e8e1d4] dark:border-zinc-700 text-[#5a7052] dark:text-zinc-400 hover:bg-[#f7f4eb] dark:hover:bg-zinc-700 transition-colors">
                      2
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-zinc-800 border border-[#e8e1d4] dark:border-zinc-700 text-[#5a7052] dark:text-zinc-400 hover:bg-[#f7f4eb] dark:hover:bg-zinc-700 transition-colors">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {featuredProducts.length === 0 && listedProducts.length === 0 && (
              <div className="text-center text-[#5a7052] dark:text-zinc-200 text-lg py-16">
                Aucun produit disponible pour cette catégorie.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bannière livraison */}
      <div className="bg-[#3c5a3e] text-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Truck size={24} className="mr-3" />
              <div>
                <p className="font-medium">
                  Livraison gratuite à partir de 35€ d'achat
                </p>
                <p className="text-sm text-white/80">
                  Livraison en 24-48h ou retrait en point relais
                </p>
              </div>
            </div>
            <Button className="bg-white text-[#3c5a3e] hover:bg-[#f7f4eb]">
              Voir les conditions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
