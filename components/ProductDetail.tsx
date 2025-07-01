"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  Leaf,
  Star,
  StarHalf,
  MapPin,
  Info,
  ShoppingCart,
  ChevronRightIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Product, Review, Tag } from "@/types"
import { getProductReviews } from "@/lib/review"
import { getProductsByCategory } from "@/lib/productCategory"
import Breadcrumb, { BreadcrumbItem } from "@/app-components/Breadcrumb"
import ProductGallery from "@/app-components/molecules/ProductGallery"
import { useCart } from "@/context/CartContext"
import Toast from "@/app-components/Toast"
import { useRouter } from "next/navigation"

interface ProductDetailProps {
  product2?: Product | {
    product: Product;
    medias: any[];
    reviews: any[];
    averageRating: number;
    reviewsCount: number;
  }
}

export default function ProductDetail({ product2 }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isLiked, setIsLiked] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const { addToCart, loading: cartLoading } = useCart()
  const [toastData, setToastData] = useState<any>(null)
  const router = useRouter()

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Si aucun produit n'est fourni, afficher un message de chargement ou d'erreur
  if (!product2) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg">Chargement du produit...</p>
        </div>
      </div>
    )
  }

  const isApiStructure = product2 && typeof product2 === 'object' && 'product' in product2;
  const prod = isApiStructure ? (product2 as any).product : product2 as Product;
  const apiData = isApiStructure ? product2 as any : null;

  const images = Array.isArray(prod.medias) && prod.medias.some((media: any) => media.mediaType?.slug === "image")
    ? prod.medias.filter((media: any) => media.mediaType?.slug === "image").map((img: any, index: number) => ({
        id: img.id || index + 1,
        src: img.publicPath
          ? `${API_URL}/${img.publicPath.replace(/^public\//, "")}`
          : "/sample.png",
        alt: prod?.name || "Image du produit",
      }))
    : [
        { id: 1, src: "/sample.png", alt: "Image du produit" },
      ];

  const recipes = [
    {
      id: 1,
      title: "Salade de tomates anciennes et burrata",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Une salade fraîche et colorée, parfaite pour l'été, qui met en valeur la saveur des tomates anciennes.",
      prepTime: "15 min",
      cookTime: "0 min",
      difficulty: "Facile",
      servings: 4,
      author: "Chef Marie",
      authorImage: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      title: "Tarte rustique aux tomates anciennes",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Une tarte savoureuse avec une pâte croustillante et des tomates juteuses, parfumée au basilic et à l'huile d'olive.",
      prepTime: "20 min",
      cookTime: "35 min",
      difficulty: "Moyen",
      servings: 6,
      author: "Chef Thomas",
      authorImage: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      title: "Gazpacho de tomates anciennes",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Une soupe froide rafraîchissante, idéale pour les journées chaudes d'été, qui concentre toutes les saveurs des tomates.",
      prepTime: "15 min",
      cookTime: "0 min",
      difficulty: "Facile",
      servings: 4,
      author: "Chef Sophie",
      authorImage: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 4,
      title: "Pâtes fraîches sauce tomates anciennes",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Des pâtes al dente nappées d'une sauce tomate maison aux herbes fraîches et à l'ail, un classique revisité.",
      prepTime: "10 min",
      cookTime: "25 min",
      difficulty: "Moyen",
      servings: 4,
      author: "Chef Marco",
      authorImage: "/placeholder.svg?height=50&width=50",
    },
  ];

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= prod.stock) {
      setQuantity(value)
    }
  }

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={i}>
              {i < Math.floor(rating) ? (
                <Star size={16} className="fill-farm-orange text-farm-orange" />
              ) : rating % 1 > 0 && i === Math.floor(rating) ? (
                <StarHalf size={16} className="fill-farm-orange text-farm-orange" />
              ) : (
                <Star size={16} className="text-gray-300 dark:text-gray-600" />
              )}
            </span>
          ))}
      </div>
    )
  }

  useEffect(() => {
    if (prod?.id) {
      getProductReviews(prod.id)
        .then((data) => setReviews(data))
        .catch(() => setReviews(prod.reviews))
    }
  }, [prod?.id])

  useEffect(() => {
    // Récupération des produits associés
    const fetchRelated = async () => {
      if (prod?.categories && prod.categories.length > 0) {
        try {
          const categoryId = prod.categories[0].id;
          const data = await getProductsByCategory(categoryId);
          if (Array.isArray(data)) {
            // Exclure le produit courant et limiter à 4
            const filtered = data.filter((p: any) => p.id !== prod.id).slice(0, 4);
            setRelatedProducts(filtered);
          } else {
            setRelatedProducts([]);
          }
        } catch {
          setRelatedProducts([]);
        }
      } else {
        setRelatedProducts([]);
      }
    };
    fetchRelated();
  }, [prod?.id, prod?.categories]);

  const handleAddToCart = async () => {
    try {
      await addToCart(prod.id, quantity);
      setToastData({
        title: "Ajouté au panier !",
        description: `${prod.name} x${quantity} a été ajouté à votre panier.`,
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
    }
  };

  return (
    <div className="min-h-screen bg-farm-beige-light dark:bg-gray-950 transition-colors duration-200">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Fil d'Ariane */}
        <Breadcrumb
          items={[
            { label: "Accueil", href: "#" },
            ...(
              Array.isArray(prod?.categories) && prod.categories.length > 0
                ? prod.categories.map((cat: any) => ({
                    label: cat.name,
                    href: `/category?item=${cat.id}${cat.slug ? `&q=${cat.slug}` : ''}`
                  }))
                : [{ label: "Catégorie" }]
            ),
            { label: prod?.name || 'Nom_produit' }
          ]}
        />

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Galerie d'images */}
          <ProductGallery
            images={images}
            tags={Array.isArray(prod.tags) ? prod.tags : []}
            currentImageIndex={currentImageIndex}
            onImageChange={handleImageChange}
            isZoomed={isZoomed}
            zoomPosition={zoomPosition}
            onZoom={() => setIsZoomed(!isZoomed)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsZoomed(false)}
          />

          {/* Informations produit */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-farm-green-dark dark:text-white mb-2">{prod?.name ?? 'Nom du produit non disponible'}</h1>
              <p className="text-farm-green dark:text-gray-300 mb-4">{prod?.shortDescription ?? 'Description non disponible'}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {renderRatingStars(apiData?.averageRating || 0)}
                  <span className="ml-2 text-farm-green dark:text-gray-300">
                    {apiData?.averageRating?.toFixed(1) || '0.0'} ({apiData?.reviewsCount || 0} avis)
                  </span>
                </div>
              </div>

              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-3xl font-bold text-farm-green-dark dark:text-white">
                  {(prod?.price ?? 0).toFixed(2)} €
                </span>
                <span className="text-sm text-farm-green dark:text-gray-400">{prod?.unitPrice} / {prod?.unity?.symbol ?? ''}</span>
                {prod.oldPrice && prod.oldPrice > prod.price && (
                  <span className="text-lg line-through text-gray-500 dark:text-gray-500">
                    {prod.oldPrice.toFixed(2)} €
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 text-farm-green dark:text-gray-300 mb-6">
                <MapPin size={16} className="text-farm-green-light dark:text-farm-green-light" />
                <span>Origine : {prod?.origin}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {Array.isArray(prod?.tags) && prod?.tags.map((tag: Tag, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-farm-beige dark:bg-gray-800 text-farm-green dark:text-gray-300 border-farm-beige-dark dark:border-gray-700"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-t border-b border-farm-beige-dark dark:border-gray-700 py-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center border border-farm-beige-dark dark:border-gray-700 rounded-full overflow-hidden">
                  <button
                    className="p-2 bg-farm-beige dark:bg-gray-800 text-farm-green-dark dark:text-white hover:bg-farm-beige-dark dark:hover:bg-gray-700"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium text-farm-green-dark dark:text-white">{quantity}</span>
                  <button
                    className="p-2 bg-farm-beige dark:bg-gray-800 text-farm-green-dark dark:text-white hover:bg-farm-beige-dark dark:hover:bg-gray-700"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= prod.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-farm-green dark:text-gray-300">
                  <span className="text-sm">
                    {prod.stock > 10
                      ? "En stock"
                      : prod.stock > 0
                        ? `Plus que ${prod.stock} en stock`
                        : "Rupture de stock"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1 bg-farm-green hover:bg-farm-green-dark text-white py-6 rounded-xl text-base"
                  onClick={handleAddToCart}
                  disabled={cartLoading || quantity > prod.stock || prod.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Ajouter au panier
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "rounded-xl border-2 py-6",
                    isLiked
                      ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500"
                      : "border-farm-beige-dark dark:border-gray-700 text-farm-green-dark dark:text-white",
                  )}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={cn("h-5 w-5", isLiked && "fill-red-500")} />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-2 border-farm-beige-dark dark:border-gray-700 text-farm-green-dark dark:text-white py-6"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-farm-beige-dark dark:border-gray-700">
                <Truck className="text-farm-green-light dark:text-farm-green-light flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-farm-green-dark dark:text-white">Livraison rapide</h3>
                  <p className="text-sm text-farm-green dark:text-gray-400">Livré en 24-48h</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-farm-beige-dark dark:border-gray-700">
                <ShieldCheck className="text-farm-green-light dark:text-farm-green-light flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-farm-green-dark dark:text-white">Qualité garantie</h3>
                  <p className="text-sm text-farm-green dark:text-gray-400">Satisfaction ou remboursé</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-farm-beige-dark dark:border-gray-700">
                <Leaf className="text-farm-green-light dark:text-farm-green-light flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-farm-green-dark dark:text-white">Agriculture durable</h3>
                  <p className="text-sm text-farm-green dark:text-gray-400">Respectueux de l'environnement</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Recettes */}
        <section className="mb-12 mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-farm-beige-dark dark:border-gray-700 overflow-hidden relative">
          {/* Décoration d'arrière-plan */}
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-farm-beige-light dark:bg-gray-900/50 z-0"></div>
          <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-farm-beige-light dark:bg-gray-900/50 z-0"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-farm-green-dark dark:text-white">Idées de recettes</h2>
                <p className="text-farm-green dark:text-gray-300 mt-1">
                  Découvrez des recettes délicieuses avec nos tomates anciennes bio
                </p>
              </div>
              <Button className="bg-farm-orange hover:bg-farm-orange-dark text-white">Toutes les recettes</Button>
            </div>

            <div className="relative min-h-[350px]">
              {/* Grille de recettes en arrière-plan, opacité réduite et interactions désactivées */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-20 pointer-events-none select-none">
                {recipes.map((recipe: any) => (
                  <motion.div
                    key={recipe.id}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="bg-farm-beige-light dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        // src={recipe.image || "/placeholder.svg"}
                        src="/sample.png"
                        alt={recipe.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          className={cn(
                            "px-2 py-1",
                            recipe.difficulty === "Facile"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : recipe.difficulty === "Moyen"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                          )}
                        >
                          {recipe.difficulty}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <div className="relative">
                          <h3 className="font-medium text-white text-lg leading-tight">{recipe.title}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-farm-green dark:text-gray-300 text-sm line-clamp-2 mb-4">{recipe.description}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-farm-green-light dark:text-farm-green-light font-medium">
                              Préparation
                            </span>
                            <span className="text-farm-green-dark dark:text-white font-medium">{recipe.prepTime}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-farm-green-light dark:text-farm-green-light font-medium">
                              Cuisson
                            </span>
                            <span className="text-farm-green-dark dark:text-white font-medium">{recipe.cookTime}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-farm-green-light dark:text-farm-green-light font-medium">
                              Personnes
                            </span>
                            <span className="text-farm-green-dark dark:text-white font-medium">{recipe.servings}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full overflow-hidden">
                            <Image
                              // src={recipe.authorImage || "/cook.jpg"}
                              src="/cook.jpg"
                              alt={recipe.author}
                              width={24}
                              height={24}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs text-farm-green dark:text-gray-400">{recipe.author}</span>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-farm-green-dark text-xs dark:text-white hover:text-farm-green-light dark:hover:text-farm-green-light p-0"
                        >
                          Consulter
                          <ChevronRightIcon className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Overlay "prochainement disponible" centré */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="flex flex-col items-center justify-center bg-farm-beige-light dark:bg-gray-900 rounded-2xl p-8 border border-farm-beige-dark dark:border-gray-700 shadow-xl max-w-md w-full">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-farm-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="inline-block mb-2 px-3 py-1 rounded-full bg-farm-orange text-white font-semibold text-sm">Prochainement disponible</span>
                  <h3 className="text-lg font-bold text-farm-green-dark dark:text-white mb-2 text-center">La section recettes arrive bientôt !</h3>
                  <p className="text-farm-green dark:text-gray-300 text-center">Nous travaillons à vous proposer des idées de recettes savoureuses pour sublimer nos produits. Restez connectés !</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Onglets d'information */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="w-full bg-farm-beige dark:bg-gray-800 p-0 h-auto border-b border-farm-beige-dark dark:border-gray-700">
            <TabsTrigger
              value="description"
              className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-farm-green-dark dark:data-[state=active]:border-farm-green-light data-[state=active]:text-farm-green-dark dark:data-[state=active]:text-white"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="producer"
              className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-farm-green-dark dark:data-[state=active]:border-farm-green-light data-[state=active]:text-farm-green-dark dark:data-[state=active]:text-white"
            >
              Producteur
            </TabsTrigger>
            <TabsTrigger
              value="nutrition"
              className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-farm-green-dark dark:data-[state=active]:border-farm-green-light data-[state=active]:text-farm-green-dark dark:data-[state=active]:text-white"
            >
              Nutrition
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-farm-green-dark dark:data-[state=active]:border-farm-green-light data-[state=active]:text-farm-green-dark dark:data-[state=active]:text-white"
            >
              Avis ({prod.reviews.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-farm-beige-dark dark:border-gray-700">
              <h2 className="text-xl font-bold text-farm-green-dark dark:text-white mb-4">À propos de ce produit</h2>
              <p className="text-farm-green dark:text-gray-300 mb-4">{(prod as Product)?.longDescription}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {(prod as Product)?.conservation && (
                  <div className="bg-farm-beige-light dark:bg-gray-900 p-4 rounded-lg">
                    <h3 className="font-medium text-farm-green-dark dark:text-white mb-2">Conservation</h3>
                    <p className="text-sm text-farm-green dark:text-gray-400">
                      {(prod as Product).conservation}
                    </p>
                  </div>
                )}
                {(prod as Product)?.preparationAdvice && (
                  <div className="bg-farm-beige-light dark:bg-gray-900 p-4 rounded-lg">
                    <h3 className="font-medium text-farm-green-dark dark:text-white mb-2">Conseils d'utilisation</h3>
                    <p className="text-sm text-farm-green dark:text-gray-400">
                      {(prod as Product).preparationAdvice}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="producer" className="pt-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-farm-beige-dark dark:border-gray-700">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex-shrink-0">
                  <div className="rounded-xl overflow-hidden bg-farm-beige-light dark:bg-gray-900 p-4 flex items-center justify-center">
                    <Image
                      src={"/placeholder.svg"}
                      alt={prod.farm.name}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-farm-green-dark dark:text-white">{prod.farm.name}</h2>
                    <Badge className="bg-farm-orange text-white flex items-center">
                      <MapPin size={12} className="mr-1" />À {prod.farm.city}
                    </Badge>
                  </div>
                  <p className="text-farm-green dark:text-gray-300 mb-4">{prod.farm.description}</p>
                  <div className="flex items-center text-farm-green dark:text-gray-300 mb-6">
                    <MapPin size={16} className="mr-2 text-farm-green-light" />
                    {prod.farm.city}
                  </div>
                  <Button className="bg-farm-green-light hover:bg-farm-green text-white">
                    Voir tous les produits de ce producteur
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="nutrition" className="pt-6">
            <div className="relative">
              {/* Maquette nutrition en arrière-plan, opacité réduite et interactions désactivées */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-farm-beige-dark dark:border-gray-700 opacity-20 pointer-events-none select-none">
                <h2 className="text-xl font-bold text-farm-green-dark dark:text-white mb-4">
                  Informations nutritionnelles
                </h2>
                <p className="text-farm-green dark:text-gray-300 mb-6">
                  Valeurs nutritionnelles pour 100g de produit. Les pourcentages sont basés sur un régime alimentaire de
                  2000 calories par jour.
                </p>

                <div className="border-t border-farm-beige-dark dark:border-gray-700 pt-4">
                  {Array.isArray(prod.nutritionFacts) && prod.nutritionFacts.length > 0 ? (
                    prod.nutritionFacts.map((fact: any, index: number) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center justify-between py-3",
                          index !== prod.nutritionFacts.length - 1 &&
                            "border-b border-farm-beige-dark dark:border-gray-700",
                        )}
                      >
                        <span className="font-medium text-farm-green-dark dark:text-white">{fact.name}</span>
                        <div className="flex items-center">
                          <span className="text-farm-green dark:text-gray-300 mr-4">{fact.value}</span>
                          {fact.percent !== undefined && (
                            <div className="w-24 bg-farm-beige dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-farm-green-light dark:bg-farm-green-light rounded-full"
                                style={{ width: `${fact.percent}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-farm-green dark:text-gray-400">Aucune information nutritionnelle disponible.</span>
                  )}
                </div>

                <div className="mt-6 flex items-start space-x-3 p-4 bg-farm-beige-light dark:bg-gray-900 rounded-lg">
                  <Info size={20} className="text-farm-green-light flex-shrink-0 mt-1" />
                  <p className="text-sm text-farm-green dark:text-gray-400">
                    Les tomates sont riches en lycopène, un puissant antioxydant, ainsi qu'en vitamines A, C et K. Elles
                    sont également une bonne source de potassium et de folate.
                  </p>
                </div>
              </div>
              {/* Overlay "prochainement disponible" centré */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="flex flex-col items-center justify-center bg-farm-beige-light dark:bg-gray-900 rounded-2xl p-8 border border-farm-beige-dark dark:border-gray-700 shadow-xl max-w-md w-full">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-farm-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="inline-block mb-2 px-3 py-1 rounded-full bg-farm-orange text-white font-semibold text-sm">Prochainement disponible</span>
                  <h3 className="text-lg font-bold text-farm-green-dark dark:text-white mb-2 text-center">La section nutrition arrive bientôt !</h3>
                  <p className="text-farm-green dark:text-gray-300 text-center">Nous travaillons à vous proposer des informations nutritionnelles détaillées pour chaque produit. Restez connectés !</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-farm-beige-dark dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-farm-green-dark dark:text-white">Avis clients</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderRatingStars(apiData?.averageRating || 0)}</div>
                  <span className="font-medium text-farm-green-dark dark:text-white">{apiData?.averageRating?.toFixed(1) || '0.0'}</span>
                  <span className="text-farm-green dark:text-gray-400">({apiData?.reviewsCount || 0})</span>
                </div>
              </div>

              <div className="space-y-6">
                {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review) => {
                  const user = review.user;
                  return (
                    <div
                      key={review.id}
                      className="border-b border-farm-beige-dark dark:border-gray-700 pb-6 last:border-0"
                    >
                      <div className="flex items-start">
                        <div className="mr-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-farm-beige dark:bg-gray-700">
                            {user ? (
                              <Image
                                src={"/placeholder.svg"}
                                alt={`${user.persona.firstName} ${user.persona.lastName?.charAt(0)}`}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-farm-green-light text-white font-medium">
                                Utilisateur inconnu
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-farm-green-dark dark:text-white">{user ? `${user.persona.firstName} ${user.persona.lastName?.charAt(0)}.` : "Utilisateur inconnu"}</h3>
                            <span className="text-sm text-farm-green dark:text-gray-400">{new Date(review.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                          </div>
                          <div className="flex mb-2">{renderRatingStars(review.rating)}</div>
                          <p className="text-farm-green dark:text-gray-300">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                {reviews.length > 3 && (
                  <Button className="w-full bg-farm-beige hover:bg-farm-beige-dark text-farm-green-dark py-3" onClick={() => setShowAllReviews(!showAllReviews)}>
                    {showAllReviews ? "Voir moins d'avis" : "Voir tous les avis"}
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      {toastData && (
        <Toast {...toastData} />
      )}
    </div>
  )
}
