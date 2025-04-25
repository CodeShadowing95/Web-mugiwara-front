"use client"

import { useRef, useState } from "react"
import { User, Settings, LogOut, ShoppingCart, Heart, Package, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Button variant="ghost" size="sm" className="h-10 flex items-end gap-1 text-[#5a7052] hover:bg-[#f7f4eb] hover:text-[#3c5a3e]">
        <div className="flex flex-col text-gray-800 dark:text-gray-200">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-nowrap">Bonjour, identifiez-vous</p>
          <p className="text-sm font-semibold self-start">Comptes & Listes</p>
        </div>
        <ChevronDown className="w-5 h-5 flex shrink-0" />
      </Button>

      <div
        className={cn(
          "absolute right-0 top-full mt-1 w-56 rounded-md border border-[#e8e1d4] bg-white p-1 shadow-md",
          "transition-all duration-200 ease-in-out origin-top-right",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        <div className="p-3 border-b border-[#e8e1d4]">
          <div className="font-medium text-[#3c5a3e]">Pierre Dupont</div>
          <div className="text-sm text-[#6b6b6b]">pierre@example.com</div>
        </div>

        <div className="py-1">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#5a7052] hover:bg-[#f7f4eb] rounded-sm text-left">
            <ShoppingCart className="h-4 w-4 text-[#8fb573]" />
            Mes commandes
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#5a7052] hover:bg-[#f7f4eb] rounded-sm text-left">
            <Heart className="h-4 w-4 text-[#8fb573]" />
            Favoris
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#5a7052] hover:bg-[#f7f4eb] rounded-sm text-left">
            <Package className="h-4 w-4 text-[#8fb573]" />
            Abonnements
          </button>
        </div>

        <div className="py-1 border-t border-[#e8e1d4]">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#5a7052] hover:bg-[#f7f4eb] rounded-sm text-left">
            <Settings className="h-4 w-4 text-[#8fb573]" />
            Paramètres
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#5a7052] hover:bg-[#f7f4eb] rounded-sm text-left">
            <LogOut className="h-4 w-4 text-[#8fb573]" />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  )
}
