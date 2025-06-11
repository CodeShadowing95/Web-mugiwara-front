import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories } from "@/constants"
import CategoryCard from "./CategoryCard"
import { Categorie } from "@/types"
import { genRandKey } from "@/utils/utilities"
import BannerCarousel from "./BannerCarousel"
import { getCategories } from "@/lib/productCategory"

export default async function  FarmHomepage() {

  const productCategories = await getCategories();

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <main className="w-full px-8 py-4">
        {/* Hero Banner Carousel */}
        {/* <div className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-[#5a7052] to-[#8fb573]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex items-center h-[200px] md:h-[300px] px-16 md:px-20">
            <div className="w-1/2 pr-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Des produits frais qui ont du goût.
              </h1>
              <div className="mb-6">
                <img src="/placeholder.svg?height=60&width=180" alt="Marché Fermier" className="h-10 object-contain" />
              </div>
            </div>
            <div className="w-1/2 flex justify-end items-center">
              <div className="relative">
                <div className="absolute -top-20 right-10 w-32 h-32 rounded-full bg-[#e8e1d4]/30"></div>
                <div className="absolute -bottom-10 left-10 w-40 h-40 rounded-full bg-[#e8e1d4]/20"></div>
                <div className="absolute top-10 left-0 w-24 h-24 rounded-full bg-[#e8e1d4]/20"></div>

                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Panier de légumes"
                  className="relative z-10 h-48 w-48 object-contain"
                />

                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="Fruits frais"
                  className="absolute right-0 bottom-0 z-20 h-32 w-32 object-contain"
                />
              </div>
            </div>
          </div>
        </div> */}
        <BannerCarousel />

        {/* Category Grid 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {productCategories.slice(0, 3).map((categorie: any, index: number) => {
            const key = genRandKey();

            return (
              <CategoryCard key={key} index={index+1} categorie={categorie} />
            )
          })}

          {/* Connexion et Promo */}
          <div className="grid grid-rows-2 gap-6">
            <div className="flex flex-col justify-between bg-white rounded-xl p-6 shadow-sm border border-[#e8e1d4]">
              <h2 className="text-xl font-bold text-[#3c5a3e] mb-3">Identifiez-vous pour une meilleure expérience</h2>
              <Button className="w-full bg-[#ffd84d] hover:bg-[#ffc91a] text-[#3c5a3e] font-medium">
                Se connecter en toute sécurité
              </Button>
            </div>

            <div className="bg-[#ffd84d] rounded-xl p-6 shadow-sm border border-[#e8e1d4] relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-[#3c5a3e] mb-2">Paniers de saison</h2>
                <p className="text-[#3c5a3e] font-medium mb-3">prix avantageux</p>
                <Button className="bg-[#3c5a3e] hover:bg-[#2a4029] text-white">Acheter maintenant</Button>
              </div>
              <div className="absolute bottom-0 right-0 w-40">
                <img src="vegetable.png" alt="Panier de légumes" className="object-contain" />
              </div>
            </div>
          </div>

        </div>


        {/* Category Grid 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {productCategories.slice(3, 7).map((categorie: any, index: number) => {
            const key = genRandKey();

            return (
              <CategoryCard key={key} index={index} categorie={categorie} />
            )
          })}
        </div>

        {/* Featured Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#3c5a3e] mb-6">Nos producteurs à l'honneur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#e8e1d4] hover:shadow-md transition-shadow group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src="farm.jpg"
                    alt={`Producteur ${item}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div>
                      <h3 className="font-medium text-white">Ferme des Collines {item}</h3>
                      <p className="text-sm text-white/80">Producteur depuis 1985</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-[#6b6b6b] mb-3">
                    Découvrez nos produits cultivés avec passion dans le respect des traditions.
                  </p>
                  <Link href="#" className="text-sm font-medium text-[#8fb573] hover:text-[#7a9c62] hover:underline">
                    Découvrir les produits
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Banner */}
        <div className="bg-[#f7f4eb] rounded-xl p-6 md:p-8 shadow-sm border border-[#e8e1d4] mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#3c5a3e] mb-4">
                Livraison directe de la ferme à votre table
              </h2>
              <p className="text-[#5a7052] mb-6">
                Nos producteurs récoltent vos produits le jour même de la livraison pour une fraîcheur incomparable.
                Découvrez le goût authentique des produits de saison.
              </p>
              <Button className="bg-[#8fb573] hover:bg-[#7a9c62] text-white">En savoir plus</Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Livraison de produits fermiers"
                className="rounded-lg max-h-[250px] object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
