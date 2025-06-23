"use client"

import { useEffect, useRef, useState } from "react"
import { User, Settings, LogOut, ShoppingCart, Heart, Package, ChevronDown, Tractor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;
      if (token) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const res = await fetch(`${apiUrl}/api/current-user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const user = await res.json();
            setCurrentUser(user);
          } else {
            setCurrentUser(null);
          }
        } catch (e) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };
    fetchCurrentUser();
  }, [])

  return (
    <div ref={containerRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {currentUser ? (
        <Button variant="ghost" size="sm" className="h-10 flex items-end gap-1 text-[#5a7052] hover:bg-[#f7f4eb] hover:text-[#3c5a3e]">
          <div className="flex flex-col text-gray-800 dark:text-gray-200">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-nowrap">Bonjour, {currentUser.persona.firstName + ' ' + currentUser.persona.lastName}</p>
            <p className="text-sm font-semibold self-start">Comptes & Listes</p>
          </div>
          <ChevronDown className="w-5 h-5 flex shrink-0" />
        </Button>
      ) : (
        <Link href="/login">
          <Button variant="outline" size="sm" className="h-10 text-[#5a7052] border-[#5a7052]">
            Se connecter
          </Button>
        </Link>
      )}

      <div
        className={cn(
          "absolute right-0 top-full mt-1 w-56 rounded-md border border-[#e8e1d4] bg-white p-1 shadow-md",
          "transition-all duration-200 ease-in-out origin-top-right",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        {currentUser ? (
          <>
          <div className="p-3 border-b border-[#e8e1d4]">
            <div className="font-medium text-[#3c5a3e]">{currentUser.persona.firstName + ' ' + currentUser.persona.lastName}</div>
            <div className="text-sm text-[#6b6b6b]">{currentUser.persona.email}</div>
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
          </>
        ) : (
          <div className="flex flex-col gap-4 p-6 bg-gradient-to-br from-[#f7f4eb] to-white text-sm">
            <div className="space-y-2">
              <Link href="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-[#5a7052] hover:bg-[#3c5a3e] text-white font-medium transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-2 shadow-sm"
                >
                  <User className="h-4 w-4" />
                  Connexion client
                </Button>
              </Link>
              <Link href="/fermier/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 border-[#5a7052] text-[#5a7052] hover:bg-[#f7f4eb] hover:text-[#3c5a3e] font-medium transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-2"
                >
                  <Tractor className="h-4 w-4" />
                  Connexion fermier
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#e8e1d4]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-[#8fb573]">ou</span>
              </div>
            </div>

            <div className="text-center text-xs">
              <span className="text-sm text-[#5a7052]">
                Nouveau client ?
              </span>
              <Link
                href="/register"
                className="ml-1 text-sm font-semibold text-[#3c5a3e] hover:text-[#8fb573] transition-colors duration-200"
              >
                Créez votre compte
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
