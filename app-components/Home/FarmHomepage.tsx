import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CategoryCard from "./CategoryCard"
import { genRandKey } from "@/utils/utilities"
import BannerCarousel from "./BannerCarousel"
import { getCategories, getCategoryChildren } from "@/lib/productCategory"
import { getFarms} from "@/lib/farm";
import {Category} from "@/types";
import {Ferme} from "@/types";

export default async function  FarmHomepage() {
  const productCategories = await getCategories();
  // Récupérer les children pour chaque catégorie en parallèle
  const categoriesWithChildren: Category[] = await Promise.all(
    productCategories.map(async (cat: any) => {
      let children = await getCategoryChildren(cat.id);
      return { ...cat, children };
    })
  );
  const farms = await getFarms();

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <main className="w-full px-8 py-4">

        <BannerCarousel />

        {/* Category Grid 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categoriesWithChildren.slice(0, 3).map((categorie, index) => {
            const key = genRandKey();
            return (
              <CategoryCard key={key} categorie={categorie} />
            )
          })}

          {/* Connexion et Promo */}
          <div className="grid grid-rows-2 gap-6">
            <div className="flex flex-col justify-between bg-white rounded-xl p-6 shadow-sm border border-[#e8e1d4]">
              <h2 className="text-xl font-bold text-[#3c5a3e] mb-3">Identifiez-vous pour une meilleure expérience</h2>
              <a href={"/login"}><Button className="w-full cursor-pointer bg-[#ffd84d] hover:bg-[#ffc91a] text-[#3c5a3e] font-medium">
                Se connecter en toute sécurité
              </Button></a>
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
          {categoriesWithChildren.slice(3, 7).map((categorie, index) => {
            const key = genRandKey();
            return (
              <CategoryCard key={key} categorie={categorie} />
            )
          })}
        </div>

        {/* Featured Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#3c5a3e] mb-6">Nos producteurs à l'honneur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {farms.slice(0, 4).map((farm: Ferme) => (
              <div
                key={genRandKey()}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#e8e1d4] hover:shadow-md transition-shadow group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src="farm.jpg"
                    alt={`${farm.name}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div>
                      <h3 className="font-medium text-white">{farm.name}</h3>
                      <p className="text-sm text-white/80">{farm.zipCode}, {farm.city}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-[#6b6b6b] mb-3">
                    {farm.description}
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
