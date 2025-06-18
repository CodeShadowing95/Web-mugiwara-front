"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import { BarChart3, ChevronDown, Home, Leaf, LogOut, Package, Settings, ShoppingBasket, Truck, Users, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface SidebarProps {
    hasFarms: boolean
}

const Sidebar = ({ hasFarms } : SidebarProps) => {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

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
                        className="flex items-center px-4 py-3 text-white bg-white/10 border-l-4 border-white"
                    >
                        <Home className="w-5 h-5 mr-3" />
                        Tableau de bord
                    </Link>
                    {hasFarms && (
                        <>
                        <Link
                            href="/fermier/orders"
                            className="flex items-center px-4 py-3 text-white/80 hover:bg-white/5 border-l-4 border-transparent"
                        >
                            <Package className="w-5 h-5 mr-3" />
                            Commandes
                        </Link>
                        <Link
                            href="/fermier/products"
                            className="flex items-center px-4 py-3 text-white/80 hover:bg-white/5 border-l-4 border-transparent"
                        >
                            <ShoppingBasket className="w-5 h-5 mr-3" />
                            Produits
                        </Link>
                        <Link
                            href="/fermier/customers"
                            className="flex items-center px-4 py-3 text-white/80 hover:bg-white/5 border-l-4 border-transparent"
                        >
                            <Users className="w-5 h-5 mr-3" />
                            Clients
                        </Link>
                        <Link
                            href="/fermier/deliveries"
                            className="flex items-center px-4 py-3 text-white/80 hover:bg-white/5 border-l-4 border-transparent"
                        >
                            <Truck className="w-5 h-5 mr-3" />
                            Livraisons
                        </Link>
                        <Link
                            href="/fermier/analytics"
                            className="flex items-center px-4 py-3 text-white/80 hover:bg-white/5 border-l-4 border-transparent"
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
                        className="flex items-center px-4 py-3 text-white/80 hover:bg-white/5 border-l-4 border-transparent"
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
                                <AvatarFallback className="bg-farm-orange text-white font-bold">--</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Aucune ferme</p>
                                <p className="text-xs text-white/60 truncate">Pierre Durand</p>
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