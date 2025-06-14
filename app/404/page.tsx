"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Leaf, Home, Search, ArrowLeft, Carrot, Apple, Egg } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Animation pour suivre légèrement le curseur
  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 40
      const y = (e.clientY - window.innerHeight / 2) / 40
      setPosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Suggestions de pages populaires
  const suggestions = [
    { name: "Produits de saison", href: "/produits" },
    { name: "Nos producteurs", href: "/producteurs" },
    { name: "Panier hebdomadaire", href: "/panier" },
    { name: "Blog culinaire", href: "/blog" },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-farm-beige-light">
      {/* Cercles décoratifs */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-farm-green/10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-farm-orange/10 translate-x-1/3 translate-y-1/3" />

      {/* Petits éléments flottants avec CSS animations au lieu de framer-motion */}
      <div
        className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-farm-green flex items-center justify-center float-animation"
        style={{ animationDuration: "5s" }}
      >
        <Carrot className="text-white w-6 h-6" />
      </div>

      <div
        className="absolute bottom-1/4 right-1/3 w-10 h-10 rounded-full bg-farm-orange flex items-center justify-center float-animation"
        style={{ animationDuration: "4s", animationDelay: "1s" }}
      >
        <Apple className="text-white w-5 h-5" />
      </div>

      <div
        className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-farm-green-light flex items-center justify-center float-animation"
        style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
      >
        <Egg className="text-white w-4 h-4" />
      </div>

      <div className="container px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-farm-green flex items-center justify-center">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Texte d'erreur */}
          <h1 className="text-8xl font-bold mb-4 text-farm-green-dark animate-fade-in">404</h1>

          <h2
            className="text-3xl font-semibold mb-4 text-farm-green animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Oups ! Cette récolte n'existe pas
          </h2>

          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Il semble que vous ayez pris un chemin qui ne mène à aucun de nos produits frais. Peut-être que cette page a
            été récoltée ou n'a jamais été plantée.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-farm-green hover:bg-farm-green-dark text-white">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-farm-green text-farm-green hover:bg-farm-green/10"
            >
              <Link href="/search">
                <Search className="mr-2 h-4 w-4" />
                Rechercher des produits
              </Link>
            </Button>
          </div>

          {/* Suggestions */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4 text-farm-green">Vous pourriez être intéressé par :</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestions.map((suggestion) => (
                <Link
                  key={suggestion.name}
                  href={suggestion.href}
                  className="px-4 py-2 rounded-full bg-farm-beige hover:bg-farm-beige-dark transition-colors text-farm-green-dark"
                >
                  {suggestion.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Retour en arrière */}
      <div className="absolute top-8 left-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.history.back()}
          className="text-farm-green hover:text-farm-green-dark hover:bg-farm-green/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>
    </div>
  )
}
