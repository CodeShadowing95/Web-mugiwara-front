import { Checkbox } from "@/components/ui/checkbox";
import { ChevronUp, ChevronDown, Leaf, Truck, Clock } from "lucide-react";
import React from "react";

interface CategoryFiltersProps {
  filtersOpen: {
    saison: boolean;
    provenance: boolean;
    prix: boolean;
    bio: boolean;
  };
  toggleFilter: (filter: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ filtersOpen, toggleFilter }) => (
  <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-[#e8e1d4] dark:border-zinc-700 mb-4">
    <h2 className="font-bold text-[#3c5a3e] dark:text-zinc-100 text-lg mb-4">
      Affiner par
    </h2>
    {/* Saison */}
    <div className="mb-4 border-b border-[#e8e1d4] dark:border-zinc-700 pb-3">
      <button
        className="w-full flex items-center justify-between font-medium text-[#3c5a3e] dark:text-zinc-100 mb-2"
        onClick={() => toggleFilter("saison")}
      >
        Saison
        {filtersOpen.saison ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {filtersOpen.saison && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="saison-printemps" className="border-[#e8e1d4] dark:border-zinc-700" />
            <label htmlFor="saison-printemps" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400">Printemps</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="saison-ete" defaultChecked />
            <label htmlFor="saison-ete" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400">Été (en cours)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="saison-automne" />
            <label htmlFor="saison-automne" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400">Automne</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="saison-hiver" />
            <label htmlFor="saison-hiver" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400">Hiver</label>
          </div>
        </div>
      )}
    </div>
    {/* Provenance */}
    <div className="mb-4 border-b border-[#e8e1d4] pb-3">
      <button
        className="w-full flex items-center justify-between font-medium text-[#3c5a3e] dark:text-zinc-100 mb-2"
        onClick={() => toggleFilter("provenance")}
      >
        Provenance
        {filtersOpen.provenance ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {filtersOpen.provenance && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="local" defaultChecked />
            <label htmlFor="local" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400">Local (&lt;50km)</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="regional" />
            <label htmlFor="regional" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400">Régional</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="france" />
            <label htmlFor="france" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400">France</label>
          </div>
        </div>
      )}
    </div>
    {/* Prix */}
    <div className="mb-4 border-b border-[#e8e1d4] pb-3">
      <button
        className="w-full flex items-center justify-between font-medium text-[#3c5a3e] dark:text-zinc-100 mb-2"
        onClick={() => toggleFilter("prix")}
      >
        Prix
        {filtersOpen.prix ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {filtersOpen.prix && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="prix-1" />
            <label htmlFor="prix-1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400">Moins de 3€</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="prix-2" defaultChecked />
            <label htmlFor="prix-2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400">3€ à 5€</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="prix-3" />
            <label htmlFor="prix-3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400">5€ à 10€</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="prix-4" />
            <label htmlFor="prix-4" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400">Plus de 10€</label>
          </div>
        </div>
      )}
    </div>
    {/* Bio */}
    <div className="mb-4">
      <button
        className="w-full flex items-center justify-between font-medium text-[#3c5a3e] dark:text-zinc-100 mb-2"
        onClick={() => toggleFilter("bio")}
      >
        Certification
        {filtersOpen.bio ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {filtersOpen.bio && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="bio" defaultChecked />
            <label htmlFor="bio" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400 flex items-center">
              <Leaf size={14} className="mr-1 text-[#8fb573]" />
              Agriculture Biologique
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hve" />
            <label htmlFor="hve" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5a7052] dark:text-zinc-400">Haute Valeur Environnementale</label>
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
);

export default CategoryFilters; 