"use client"

import { Tractor, Leaf, Apple, Carrot, Wheat } from "lucide-react"

interface FarmLoaderProps {
  size?: "xs" | "sm" | "md" | "lg"
  variant?: "tractor" | "leaf" | "apple" | "carrot" | "wheat"
  className?: string
}

export function FarmLoader({ size = "md", variant = "tractor", className = "" }: FarmLoaderProps) {
  const sizeClasses = {
    xs: "w-10 h-10",
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const iconSizes = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const orbitSizes = {
    xs: "w-2 h-2",
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  }

  const icons = {
    tractor: Tractor,
    leaf: Leaf,
    apple: Apple,
    carrot: Carrot,
    wheat: Wheat,
  }

  const IconComponent = icons[variant]

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Cercle principal */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--farm-orange)] to-[var(--farm-orange)]-dark flex items-center justify-center shadow-lg animate-pulse">
        <IconComponent className={`${iconSizes[size]} text-white`} />
      </div>

      {/* Cercle orbitant */}
      <div className="absolute inset-0 animate-spin">
        <div
          className={`absolute -top-1 left-1/2 transform -translate-x-1/2 ${orbitSizes[size]} rounded-full bg-farm-green shadow-md`}
        ></div>
      </div>

      {/* Cercle orbitant secondaire (optionnel) */}
      <div className="absolute inset-0 animate-spin" style={{ animationDirection: "reverse", animationDuration: "3s" }}>
        <div
          className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 ${orbitSizes[size]} rounded-full bg-farm-green-light shadow-md`}
        ></div>
      </div>
    </div>
  )
}

// Loader avec texte
interface FarmLoaderWithTextProps extends FarmLoaderProps {
  text?: string
  subtext?: string
}

export function FarmLoaderWithText({
  text = "Chargement...",
  subtext,
  size = "md",
  variant = "tractor",
  className = "",
}: FarmLoaderWithTextProps) {
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <FarmLoader size={size} variant={variant} />
      <div className="text-center">
        <p className="text-farm-green-dark font-medium">{text}</p>
        {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
      </div>
    </div>
  )
}

// Loader pleine page
export function FarmPageLoader({
  text = "Chargement de votre ferme...",
  subtext = "Préparation de vos produits frais",
}: {
  text?: string
  subtext?: string
}) {
  return (
    <div className="fixed inset-0 bg-farm-beige-light flex items-center justify-center z-50">
      <div className="text-center">
        <FarmLoader size="lg" variant="tractor" className="mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-farm-green-dark mb-2">{text}</h2>
        <p className="text-gray-600">{subtext}</p>

        {/* Barre de progression animée */}
        <div className="mt-6 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-farm-green to-farm-orange rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

// Loader inline pour boutons
export function FarmButtonLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <div className="relative w-4 h-4">
        <div className="absolute inset-0 rounded-full bg-current opacity-20 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-current opacity-40 animate-pulse"></div>
        <Leaf className="w-4 h-4 animate-spin" />
      </div>
      <span>Chargement...</span>
    </div>
  )
}
