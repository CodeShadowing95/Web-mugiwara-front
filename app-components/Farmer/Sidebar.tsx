"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { BarChart3, ChevronDown, Home, Leaf, LogOut, Package, Settings, ShoppingBasket, Tractor, Truck, Users, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/UserContext';


interface SidebarProps {
    hasFarms: boolean
}

const Sidebar = ({ hasFarms } : SidebarProps) => {
    const router = useRouter()
    const userContext = useUser()
    
    if (!userContext) {
        return <div>Erreur : Contexte utilisateur non disponible</div>
    }
    
    const { currentUser } = userContext
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState(typeof window !== "undefined" ? localStorage.getItem("selectedMenu") || "dashboard" : "dashboard")
    const [hasRedirected, setHasRedirected] = useState(false) // ← pour éviter double redirection

    const userInitials = currentUser?.persona.firstName.charAt(0) + currentUser?.persona.lastName.charAt(0).toUpperCase();

    const handleSelectedMenu = (menu: string) => {
        setSelectedMenu(menu)
        localStorage.setItem("selectedMenu", menu)
    }

    // Chargement initial
    useEffect(() => {
      const menu = localStorage.getItem('selectedMenu') || 'dashboard'
      console.log("Actual user: ", currentUser);
      
      setSelectedMenu(menu)
    }, [])

    useEffect(() => {
        if(!hasRedirected) {
            switch (selectedMenu) {
                case "dashboard":
                    router.push("/fermier")
                    break;
                case "farms":
                    router.push("/fermier/mes-fermes")
                    break;
                case "products":
                    router.push("/fermier/produits")
                    break;
                case "orders":
                    router.push("/fermier/commandes")
                    break;
                case "profile":
                    router.push("/fermier/profile")
                    break;
                default:
                    router.push("/fermier")
                    break;
            }
            setHasRedirected(true)
        }
    }, [selectedMenu, hasRedirected])

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-farm-green-dark text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="flex flex-col h-full">
                {/* Logo et fermeture mobile */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <Link href="/fermier" className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                            <Leaf className="w-6 h-6 text-farm-green-dark" />
                        </div>
                        <span className="font-bold text-lg">CocotteConnect</span>
                    </Link>
                    <button
                        className="lg:hidden text-white hover:text-gray-200"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Fermer le menu"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 overflow-y-auto">
                    <div className="px-4 mb-2 text-xs font-semibold text-white/60 uppercase tracking-wider">Principal</div>
                    <Link
                        href="/fermier"
                        className={`flex items-center px-4 py-3 text-white ${selectedMenu === "dashboard" ? "bg-white/10 border-l-4 border-white" : "hover:bg-white/5 border-l-4 border-transparent"}`}
                        onClick={() => handleSelectedMenu("dashboard")}
                    >
                        <Home className="w-5 h-5 mr-3" />
                        Tableau de bord
                    </Link>
                    {hasFarms && (
                        <>
                        <Link
                            href="/fermier/mes-fermes"
                            className={`flex items-center px-4 py-3 text-white ${selectedMenu === "farms" ? "bg-white/10 border-l-4 border-white" : "hover:bg-white/5 border-l-4 border-transparent"}`}
                            onClick={() => handleSelectedMenu("farms")}
                        >
                            <Tractor className="w-5 h-5 mr-3" />
                            Mes fermes
                        </Link>
                        <Link
                            href="/fermier/produits"
                            className={`flex items-center px-4 py-3 text-white ${selectedMenu === "products" ? "bg-white/10 border-l-4 border-white" : "hover:bg-white/5 border-l-4 border-transparent"}`}
                            onClick={() => handleSelectedMenu("products")}
                        >
                            <ShoppingBasket className="w-5 h-5 mr-3" />
                            Produits
                        </Link>
                        <Link
                            href="/fermier/commandes"
                            className={`flex items-center px-4 py-3 text-white ${selectedMenu === "orders" ? "bg-white/10 border-l-4 border-white" : "hover:bg-white/5 border-l-4 border-transparent"}`}
                            onClick={() => handleSelectedMenu("orders")}
                        >
                            <Package className="w-5 h-5 mr-3" />
                            Commandes
                        </Link>
                        {/* <Link
                            href="/fermier/customers"
                            className={`flex items-center px-4 py-3 text-white ${selectedMenu === "customers" ? "bg-white/10 border-l-4 border-white" : "hover:bg-white/5 border-l-4 border-transparent"}`}
                            onClick={() => handleSelectedMenu("customers")}
                        >
                            <Users className="w-5 h-5 mr-3" />
                            Clients
                        </Link> */}
                        <div
                            className={`flex items-center px-4 py-3 text-white/50 border-l-4 border-transparent cursor-not-allowed`}
                        >
                            <Users className="w-5 h-5 mr-3" />
                            Clients (Inactif)
                        </div>
                        {/* <Link
                            href="/fermier/deliveries"
                            className={`flex items-center px-4 py-3 text-white ${selectedMenu === "deliveries" ? "bg-white/10 border-l-4 border-white" : "hover:bg-white/5 border-l-4 border-transparent"}`}
                            onClick={() => handleSelectedMenu("deliveries")}
                        >
                            <Truck className="w-5 h-5 mr-3" />
                            Livraisons
                        </Link> */}
                        <div
                            className={`flex items-center px-4 py-3 text-white/50 border-l-4 border-transparent cursor-not-allowed`}
                        >
                            <Truck className="w-5 h-5 mr-3" />
                            Livraisons (Inactif)
                        </div>
                        <Link
                            href="/fermier/analytics"
                            className={`flex items-center px-4 py-3 text-white ${selectedMenu === "analytics" ? "bg-white/10 border-l-4 border-white" : "hover:bg-white/5 border-l-4 border-transparent"}`}
                            onClick={() => handleSelectedMenu("analytics")}
                        >
                            <BarChart3 className="w-5 h-5 mr-3" />
                            Statistiques
                        </Link>
                        </>
                    )}

                    <div className="px-4 mt-6 mb-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                        Paramètres
                    </div>
                    <Link
                        href="/fermier/profile"
                        className={`flex items-center px-4 py-3 text-white ${selectedMenu === "profile" ? "bg-white/10 border-l-4 border-white" : "hover:bg-white/5 border-l-4 border-transparent"}`}
                        onClick={() => handleSelectedMenu("profile")}
                    >
                        <Settings className="w-5 h-5 mr-3" />
                        Profil
                    </Link>
                    <div
                        onClick={() => {
                            // localStorage.removeItem("newFarmData");
                            localStorage.clear();
                            router.push('/fermier/login');
                        }}
                        className="cursor-pointer flex items-center px-4 py-3 text-white/80 hover:bg-white/5 border-l-4 border-transparent"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Déconnexion
                    </div>
                </nav>

                
                {/* Profil fermier */}
                {hasFarms ? (
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ferme des Oliviers" />
                                <AvatarFallback className="bg-farm-orange text-white">FO</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Ferme des Oliviers</p>
                                <p className="text-xs text-white/60 truncate">Pierre Durand</p>
                            </div>
                            <ChevronDown className="w-4 h-4 ml-2 text-white/60" />
                        </div>
                    </div>
                ) : (
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ferme des Oliviers" />
                                <AvatarFallback className="bg-farm-orange text-white font-bold">{userInitials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Aucune ferme</p>
                                <p className="text-xs text-white/60 truncate">{currentUser?.persona.firstName} {currentUser?.persona.lastName}</p>
                            </div>
                            <ChevronDown className="w-4 h-4 ml-2 text-white/60" />
                        </div>
                    </div>
                )}
            </div>
        </aside>
    )
}

export default Sidebar