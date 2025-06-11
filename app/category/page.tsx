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
import { categories } from "@/constants";

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

  const [family, setFamily] = useState("");
  const [category, setCategory] = useState("");
  const [ products, setProducts ] = useState([]);
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
  const fetchProducts = async () => {
    try {
      // Use HTTP for local development instead of HTTPS
      const url = "http://localhost:8080/api/public/v1/products";
      const options = {
        method: "GET",
        // You can add headers here if needed
        headers: {
          'Accept': 'application/json'
        }
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle the error gracefully - can setProducts([]) if needed
    }
  };

  useEffect(() => {
    const fetchFamilyCategoryFromURL = () => {
      const idItem = parseInt(item) - 1;
      setFamily(categories[idItem]?.categorie);
      setCategory(
        query
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    };
    fetchProducts();
    fetchFamilyCategoryFromURL();
  }, [item, query]);

  const produits = [
    {
      id: 1,
      nom: "Fraises de saison Bio",
      producteur: "Ferme des Collines",
      prix: 4.95,
      note: 4.8,
      avis: 127,
      image: "/placeholder.svg?height=200&width=200",
      bio: true,
      local: true,
    },
    {
      id: 2,
      nom: "Tomates anciennes variées",
      producteur: "Potager du Sud",
      prix: 3.75,
      note: 4.5,
      avis: 98,
      image: "/placeholder.svg?height=200&width=200",
      bio: true,
      local: true,
    },
    {
      id: 3,
      nom: "Panier légumes de saison",
      producteur: "Ferme des Quatre Vents",
      prix: 18.9,
      note: 4.9,
      avis: 203,
      image: "/placeholder.svg?height=200&width=200",
      bio: true,
      local: true,
    },
    {
      id: 4,
      nom: "Pommes Golden Bio",
      producteur: "Vergers du Soleil",
      prix: 3.5,
      note: 4.2,
      avis: 87,
      image: "/placeholder.svg?height=200&width=200",
      bio: true,
      local: true,
    },
    {
      id: 5,
      nom: "Courgettes fraîches",
      producteur: "Jardins de Provence",
      prix: 2.8,
      note: 4.6,
      avis: 56,
      image: "/placeholder.svg?height=200&width=200",
      bio: false,
      local: true,
    },
    {
      id: 6,
      nom: "Assortiment de baies",
      producteur: "Ferme des Collines",
      prix: 5.9,
      note: 4.7,
      avis: 73,
      image: "/placeholder.svg?height=200&width=200",
      bio: true,
      local: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9f7f2] dark:bg-zinc-950">
      {/* Fil d'Ariane */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 text-sm text-[#5a7052] dark:text-zinc-100 flex items-center space-x-2">
        <Link href="/" className="hover:underline flex items-center">
          <Home size={14} className="mr-1" />
          Accueil
        </Link>
        <ChevronRight size={14} />
        <span className="font-medium">
          {family} - {category}
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
                {family}
              </h1>
              <p className="text-[#5a7052] dark:text-zinc-500 mb-4">
                Découvrez notre sélection de fruits et légumes frais, cultivés
                avec passion par nos producteurs locaux. Tous nos produits sont
                récoltés à maturité pour vous garantir une fraîcheur et une
                saveur optimales.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#5a7052] dark:bg-emerald-700 text-[#f7f4eb] dark:text-emerald-50 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  {category}
                </span>
                <span className="bg-[#f7f4eb] dark:bg-zinc-800 text-[#5a7052] dark:text-zinc-100 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Leaf
                    size={14}
                    className="mr-1 text-[#8fb573] dark:text-emerald-400"
                  />
                  Bio
                </span>
                <span className="bg-[#f7f4eb] dark:bg-zinc-800 text-[#5a7052] dark:text-zinc-100 px-3 py-1 rounded-full text-sm font-medium">
                  Local
                </span>
              </div>
            </div>

            {/* Produits mis en avant */}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {produits.slice(0, 3).map((produit) => {
                  return (
                    <Link
                      href={`/product/${produit.id}`}
                      key={produit.id}
                      className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-[#e8e1d4] dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow relative group"
                    >
                      {produit.bio && (
                        <span className="absolute top-3 left-3 bg-[#8fb573] dark:bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center z-10">
                          <Leaf size={10} className="mr-0.5" />
                          Bio
                        </span>
                      )}
                      <div className="relative mb-3 bg-[#f7f4eb] dark:bg-zinc-800 rounded-lg p-4 flex items-center justify-center h-48">
                        <img
                          src="vegetable.png"
                          alt={produit.nom}
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
                                {i < Math.floor(produit.note) ? (
                                  <Star size={14} className="fill-current" />
                                ) : produit.note % 1 > 0 &&
                                  i === Math.floor(produit.note) ? (
                                  <StarHalf
                                    size={14}
                                    className="fill-current"
                                  />
                                ) : (
                                  <Star
                                    size={14}
                                    className="text-gray-300 dark:text-zinc-600"
                                  />
                                )}
                              </span>
                            ))}
                          <span className="text-xs text-[#5a7052] dark:text-zinc-100 ml-1">
                            ({produit.avis})
                          </span>
                        </div>
                        <h3 className="font-medium text-[#3c5a3e] dark:text-zinc-100">
                          {produit.nom}
                        </h3>
                        <p className="text-sm text-[#5a7052] dark:text-zinc-500">
                          {produit.producteur}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold text-[#3c5a3e] dark:text-zinc-100">
                          {produit.prix.toFixed(2)} €
                        </span>
                        <Button
                          size="sm"
                          className="bg-[#8fb573] hover:bg-[#7a9c62] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
                          onClick={(e: any) => {
                            e.stopPropagation();
                            e.preventDefault();
                            alert("OK");
                          }}
                        >
                          <ShoppingCart size={14} className="mr-1" />
                          Ajouter
                        </Button>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Tous les produits */}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {produits.map((produit) => (
                  <Link
                    href={`/product/${produit.id}`}
                    key={produit.id}
                    className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-[#e8e1d4] dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow relative group"
                  >
                    {produit.bio && (
                      <span className="absolute top-3 left-3 bg-[#8fb573] dark:bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center z-10">
                        <Leaf size={10} className="mr-0.5" />
                        Bio
                      </span>
                    )}
                    <div className="relative mb-3 bg-[#f7f4eb] dark:bg-zinc-800 rounded-lg p-4 flex items-center justify-center h-48">
                      <img
                        src="vegetable.png"
                        alt={produit.nom}
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
                              {i < Math.floor(produit.note) ? (
                                <Star size={14} className="fill-current" />
                              ) : produit.note % 1 > 0 &&
                                i === Math.floor(produit.note) ? (
                                <StarHalf size={14} className="fill-current" />
                              ) : (
                                <Star
                                  size={14}
                                  className="text-gray-300 dark:text-zinc-600"
                                />
                              )}
                            </span>
                          ))}
                        <span className="text-xs text-[#5a7052] dark:text-zinc-100 ml-1">
                          ({produit.avis})
                        </span>
                      </div>
                      <h3 className="font-medium text-[#3c5a3e] dark:text-zinc-100">
                        {produit.nom}
                      </h3>
                      <p className="text-sm text-[#5a7052] dark:text-zinc-500">
                        {produit.producteur}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-[#3c5a3e] dark:text-zinc-100">
                        {produit.prix.toFixed(2)} €
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
                    3
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-zinc-800 border border-[#e8e1d4] dark:border-zinc-700 text-[#5a7052] dark:text-zinc-400 hover:bg-[#f7f4eb] dark:hover:bg-zinc-700 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
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
