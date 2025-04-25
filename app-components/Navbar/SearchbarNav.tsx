"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SearchbarNav() {
  const [category, setCategory] = useState("Tous les produits")

  const categories = [
    "Tous les produits",
    "Fruits & Légumes",
    "Produits laitiers",
    "Viandes & Charcuterie",
    "Œufs & Volaille",
    "Miel & Confitures",
    "Boissons & Jus",
  ]

  return (
    <div className="w-full max-w-4xl">
      <div className="flex rounded-md overflow-hidden shadow-lg border border-[#e8e1d4] dark:border-zinc-700 bg-white dark:bg-zinc-800">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-4 py-2 h-10 rounded-none border-r border-[#e8e1d4] dark:border-zinc-700 bg-[#f7f4eb] dark:bg-zinc-900 hover:bg-[#efe9d9] dark:hover:bg-zinc-800 text-[#5a7052] dark:text-emerald-300 font-medium transition-colors"
            >
              {category}
              <ChevronDown className="h-4 w-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 bg-[#f7f4eb] dark:bg-zinc-900 border-[#e8e1d4] dark:border-zinc-700">
            {categories.map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() => setCategory(item)}
                className="text-[#5a7052] dark:text-emerald-300 hover:bg-[#efe9d9] dark:hover:bg-zinc-800 focus:bg-[#efe9d9] dark:focus:bg-zinc-800 cursor-pointer"
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <input
          type="text"
          placeholder="Rechercher des produits fermiers..."
          className="flex-1 px-4 py-2 h-10 outline-none text-[#4a4a4a] dark:text-gray-200 placeholder-[#a3a3a3] dark:placeholder-gray-500 bg-white dark:bg-zinc-800"
        />

        <Button type="submit" className="h-10 px-6 rounded-none bg-[#8fb573] hover:bg-[#7a9c62] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
