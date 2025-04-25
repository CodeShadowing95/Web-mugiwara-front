"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
// import { motion } from "framer-motion"
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
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/app-components/ThemeToggle"

// Types
type ProductImage = {
  id: number
  src: string
  alt: string
}

type ProductReview = {
  id: number
  author: string
  rating: number
  date: string
  comment: string
  avatar?: string
}

type NutritionFact = {
  name: string
  value: string
  percent?: number
}

type ProductProps = {
  id: number
  name: string
  description: string
  longDescription: string
  price: number
  oldPrice?: number
  unit: string
  origin: string
  producer: {
    name: string
    location: string
    description: string
    image: string
    distance: string
  }
  images: ProductImage[]
  tags: string[]
  isBio: boolean
  isLocal: boolean
  isSeasonal: boolean
  stock: number
  rating: number
  reviewCount: number
  reviews: ProductReview[]
  nutritionFacts: NutritionFact[]
  relatedProducts: {
    id: number
    name: string
    image: string
    price: number
    unit: string
  }[]
}

export default function ProductDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isLiked, setIsLiked] = useState(false)

  // Données du produit (normalement récupérées depuis une API)
  const product: ProductProps = {
    id: 1,
    name: "Tomates anciennes bio",
    description: "Assortiment de tomates anciennes cultivées en agriculture biologique",
    longDescription:
      "Nos tomates anciennes bio sont cultivées avec passion par nos producteurs locaux. Elles sont récoltées à maturité pour vous garantir une saveur exceptionnelle. Cet assortiment coloré comprend plusieurs variétés comme la Noire de Crimée, l'Ananas, la Cœur de Bœuf et la Green Zebra. Parfaites pour vos salades d'été, vos sauces maison ou simplement à déguster avec un filet d'huile d'olive et du basilic frais.",
    price: 4.95,
    oldPrice: 5.95,
    unit: "500g",
    origin: "Provence, France",
    producer: {
      name: "Ferme des Quatre Saisons",
      location: "Aix-en-Provence",
      description:
        "La Ferme des Quatre Saisons est une exploitation familiale qui pratique l'agriculture biologique depuis plus de 20 ans. Située au cœur de la Provence, elle bénéficie d'un climat idéal pour la culture de fruits et légumes savoureux.",
      image: "/placeholder.svg?height=100&width=100",
      distance: "35km",
    },
    images: [
      { id: 1, src: "/sample.png", alt: "Tomates anciennes bio" },
      { id: 2, src: "/vegetable.png", alt: "Tomates anciennes bio en gros plan" },
      { id: 3, src: "/vegetable2.png", alt: "Tomates anciennes bio en salade" },
      { id: 4, src: "/sample.png", alt: "Tomates anciennes bio sur plant" },
    ],
    tags: ["Légumes", "Été", "Cuisine méditerranéenne", "Salade"],
    isBio: true,
    isLocal: true,
    isSeasonal: true,
    stock: 24,
    rating: 4.8,
    reviewCount: 127,
    reviews: [
      {
        id: 1,
        author: "Marie L.",
        rating: 5,
        date: "15/07/2023",
        comment:
          "Ces tomates sont absolument délicieuses ! Elles ont un goût authentique qu'on ne trouve pas dans les supermarchés. Je les recommande vivement.",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: 2,
        author: "Thomas D.",
        rating: 4,
        date: "02/07/2023",
        comment:
          "Très bonnes tomates, juteuses et parfumées. Le seul petit bémol est qu'elles ne se conservent pas très longtemps, mais c'est normal pour des produits frais et bio.",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: 3,
        author: "Sophie M.",
        rating: 5,
        date: "28/06/2023",
        comment:
          "Un délice ! Ces tomates ont un goût incroyable, on sent vraiment la différence avec celles du supermarché. Je ne peux plus m'en passer pour mes salades estivales.",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    nutritionFacts: [
      { name: "Calories", value: "18 kcal", percent: 1 },
      { name: "Protéines", value: "0.9g", percent: 2 },
      { name: "Glucides", value: "3.9g", percent: 1 },
      { name: "Lipides", value: "0.2g", percent: 0 },
      { name: "Fibres", value: "1.2g", percent: 5 },
      { name: "Vitamine C", value: "14mg", percent: 17 },
    ],
    relatedProducts: [
      { id: 2, name: "Basilic frais bio", image: "/placeholder.svg?height=200&width=200", price: 1.95, unit: "botte" },
      { id: 3, name: "Mozzarella di Bufala", image: "/placeholder.svg?height=200&width=200", price: 3.5, unit: "125g" },
      {
        id: 4,
        name: "Huile d'olive extra vierge",
        image: "/placeholder.svg?height=200&width=200",
        price: 9.95,
        unit: "50cl",
      },
      {
        id: 5,
        name: "Poivrons multicolores bio",
        image: "/placeholder.svg?height=200&width=200",
        price: 4.5,
        unit: "400g",
      },
    ],
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
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

  return (
    <div className="min-h-screen bg-farm-beige-light dark:bg-gray-950 transition-colors duration-200">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Fil d'Ariane */}
        <nav className="text-sm text-farm-green mb-6 dark:text-gray-400">
          <ol className="flex flex-wrap items-center space-x-2">
            <li>
              <Link href="#" className="hover:text-farm-green-dark dark:hover:text-white">
                Accueil
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href="#" className="hover:text-farm-green-dark dark:hover:text-white">
                Catégorie_produit
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="font-medium text-farm-green-dark dark:text-white">Nom_produit</li>
          </ol>
        </nav>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Galerie d'images */}
          <div className="space-y-4">
            <div
              className={cn(
                "relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 aspect-square",
                isZoomed ? "cursor-zoom-out" : "cursor-zoom-in",
              )}
              onClick={() => setIsZoomed(!isZoomed)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <div
                className={cn("w-full h-full transition-transform duration-200", isZoomed ? "scale-150" : "scale-100")}
                style={isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : undefined}
              >
                <Image
                  src={product.images[currentImageIndex].src || "/placeholder.svg"}
                  alt={product.images[currentImageIndex].alt}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
                {product.isBio && (
                  <Badge className="bg-farm-green text-white px-3 py-1 flex items-center">
                    <Leaf size={14} className="mr-1" />
                    Bio
                  </Badge>
                )}
                {product.isLocal && (
                  <Badge className="bg-farm-orange text-white px-3 py-1 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    Local
                  </Badge>
                )}
                {product.isSeasonal && <Badge className="bg-farm-green-light text-white px-3 py-1">De saison</Badge>}
                {product.oldPrice && <Badge className="bg-red-500 text-white px-3 py-1">Promo</Badge>}
              </div>

              {/* Navigation des images */}
              {product.images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
                    }}
                  >
                    <ChevronLeft size={20} className="text-farm-green-dark dark:text-white" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
                    }}
                  >
                    <ChevronRight size={20} className="text-farm-green-dark dark:text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Miniatures */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    className={cn(
                      "relative rounded-lg overflow-hidden border-2 flex-shrink-0 w-20 h-20 transition-all",
                      index === currentImageIndex
                        ? "border-farm-green-dark dark:border-farm-green-light"
                        : "border-transparent hover:border-farm-green/50 dark:hover:border-farm-green-light/50",
                    )}
                    onClick={() => handleImageChange(index)}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-farm-green-dark dark:text-white mb-2">{product.name}</h1>
              <p className="text-farm-green dark:text-gray-300 mb-4">{product.description}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {renderRatingStars(product.rating)}
                  <span className="ml-2 text-farm-green dark:text-gray-300">
                    {product.rating.toFixed(1)} ({product.reviewCount} avis)
                  </span>
                </div>
              </div>

              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-3xl font-bold text-farm-green-dark dark:text-white">
                  {product.price.toFixed(2)} €
                </span>
                <span className="text-sm text-farm-green dark:text-gray-400">/ {product.unit}</span>
                {product.oldPrice && (
                  <span className="text-lg line-through text-gray-500 dark:text-gray-500">
                    {product.oldPrice.toFixed(2)} €
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 text-farm-green dark:text-gray-300 mb-6">
                <MapPin size={16} className="text-farm-green-light dark:text-farm-green-light" />
                <span>Origine : {product.origin}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-farm-beige dark:bg-gray-800 text-farm-green dark:text-gray-300 border-farm-beige-dark dark:border-gray-700"
                  >
                    {tag}
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
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-farm-green dark:text-gray-300">
                  <span className="text-sm">
                    {product.stock > 10
                      ? "En stock"
                      : product.stock > 0
                        ? `Plus que ${product.stock} en stock`
                        : "Rupture de stock"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-farm-green hover:bg-farm-green-dark text-white py-6 rounded-xl text-base">
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
              Avis ({product.reviews.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-farm-beige-dark dark:border-gray-700">
              <h2 className="text-xl font-bold text-farm-green-dark dark:text-white mb-4">À propos de ce produit</h2>
              <p className="text-farm-green dark:text-gray-300 mb-4">{product.longDescription}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-farm-beige-light dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="font-medium text-farm-green-dark dark:text-white mb-2">Conservation</h3>
                  <p className="text-sm text-farm-green dark:text-gray-400">
                    Conservez vos tomates à température ambiante, jamais au réfrigérateur. Elles se garderont ainsi 4 à
                    5 jours en préservant toutes leurs saveurs.
                  </p>
                </div>
                <div className="bg-farm-beige-light dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="font-medium text-farm-green-dark dark:text-white mb-2">Conseils d'utilisation</h3>
                  <p className="text-sm text-farm-green dark:text-gray-400">
                    Idéales en salade avec un filet d'huile d'olive et du basilic frais. Parfaites également pour
                    réaliser des sauces, des tartes ou des gratins.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="producer" className="pt-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-farm-beige-dark dark:border-gray-700">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex-shrink-0">
                  <div className="rounded-xl overflow-hidden bg-farm-beige-light dark:bg-gray-900 p-4 flex items-center justify-center">
                    <Image
                      src={product.producer.image || "/placeholder.svg"}
                      alt={product.producer.name}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-farm-green-dark dark:text-white">{product.producer.name}</h2>
                    <Badge className="bg-farm-orange text-white flex items-center">
                      <MapPin size={12} className="mr-1" />À {product.producer.distance}
                    </Badge>
                  </div>
                  <p className="text-farm-green dark:text-gray-300 mb-4">{product.producer.description}</p>
                  <div className="flex items-center text-farm-green dark:text-gray-300 mb-6">
                    <MapPin size={16} className="mr-2 text-farm-green-light" />
                    {product.producer.location}
                  </div>
                  <Button className="bg-farm-green-light hover:bg-farm-green text-white">
                    Voir tous les produits de ce producteur
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="nutrition" className="pt-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-farm-beige-dark dark:border-gray-700">
              <h2 className="text-xl font-bold text-farm-green-dark dark:text-white mb-4">
                Informations nutritionnelles
              </h2>
              <p className="text-farm-green dark:text-gray-300 mb-6">
                Valeurs nutritionnelles pour 100g de produit. Les pourcentages sont basés sur un régime alimentaire de
                2000 calories par jour.
              </p>

              <div className="border-t border-farm-beige-dark dark:border-gray-700 pt-4">
                {product.nutritionFacts.map((fact, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-between py-3",
                      index !== product.nutritionFacts.length - 1 &&
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
                ))}
              </div>

              <div className="mt-6 flex items-start space-x-3 p-4 bg-farm-beige-light dark:bg-gray-900 rounded-lg">
                <Info size={20} className="text-farm-green-light flex-shrink-0 mt-1" />
                <p className="text-sm text-farm-green dark:text-gray-400">
                  Les tomates sont riches en lycopène, un puissant antioxydant, ainsi qu'en vitamines A, C et K. Elles
                  sont également une bonne source de potassium et de folate.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-farm-beige-dark dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-farm-green-dark dark:text-white">Avis clients</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderRatingStars(product.rating)}</div>
                  <span className="font-medium text-farm-green-dark dark:text-white">{product.rating.toFixed(1)}</span>
                  <span className="text-farm-green dark:text-gray-400">({product.reviewCount})</span>
                </div>
              </div>

              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-farm-beige-dark dark:border-gray-700 pb-6 last:border-0"
                  >
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-farm-beige dark:bg-gray-700">
                          {review.avatar ? (
                            <Image
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.author}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-farm-green-light text-white font-medium">
                              {review.author.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-farm-green-dark dark:text-white">{review.author}</h3>
                          <span className="text-sm text-farm-green dark:text-gray-400">{review.date}</span>
                        </div>
                        <div className="flex mb-2">{renderRatingStars(review.rating)}</div>
                        <p className="text-farm-green dark:text-gray-300">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button className="w-full bg-farm-beige hover:bg-farm-beige-dark text-farm-green-dark py-3">
                  Voir tous les avis
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Produits associés */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-farm-green-dark dark:text-white mb-6">
            Produits fréquemment achetés ensemble
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {product.relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-farm-beige-dark dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="aspect-square rounded-lg bg-farm-beige-light dark:bg-gray-900 mb-3 flex items-center justify-center p-2">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="object-contain max-h-32"
                  />
                </div>
                <h3 className="font-medium text-farm-green-dark dark:text-white mb-1 line-clamp-2">{item.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="font-bold text-farm-green-dark dark:text-white">{item.price.toFixed(2)} €</span>
                    <span className="text-xs text-farm-green dark:text-gray-400 ml-1">/ {item.unit}</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-farm-green hover:bg-farm-green-dark text-white h-8 w-8 p-0 rounded-full"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
