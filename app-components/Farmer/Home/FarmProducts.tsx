"use client";

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
    Package,
    ShoppingBasket,
    Search,
    Plus,
    X,
    AlertTriangle,
    Edit,
    Trash2,
} from "lucide-react"
import Paginate from '@/app-components/Paginate';


const FarmProducts = () => {
    const [activeTab, setActiveTab] = useState("tous")
    const [searchQuery, setSearchQuery] = useState("")

    // Données des produits de la ferme
    const farmProducts = [
        {
            id: 1,
            name: "Panier de légumes bio",
            category: "Légumes",
            price: 24.9,
            sales: 42,
            stock: 18,
            status: "disponible",
            image: "/vegetable.png",
        },
        {
            id: 2,
            name: "Œufs fermiers (x12)",
            category: "Produits laitiers",
            price: 4.5,
            sales: 36,
            stock: 24,
            status: "disponible",
            image: "/vegetable.png",
        },
        {
            id: 3,
            name: "Miel de fleurs sauvages",
            category: "Produits transformés",
            price: 8.9,
            sales: 28,
            stock: 15,
            status: "disponible",
            image: "/vegetable.png",
        },
        {
            id: 4,
            name: "Fromage de chèvre",
            category: "Produits laitiers",
            price: 6.2,
            sales: 25,
            stock: 12,
            status: "disponible",
            image: "/vegetable.png",
        },
        {
            id: 5,
            name: "Tomates cerises bio",
            category: "Légumes",
            price: 3.8,
            sales: 34,
            stock: 5,
            status: "stock_faible",
            image: "/vegetable.png",
        },
        {
            id: 6,
            name: "Salade verte bio",
            category: "Légumes",
            price: 2.5,
            sales: 29,
            stock: 3,
            status: "stock_faible",
            image: "/vegetable.png",
        },
        {
            id: 7,
            name: "Confiture de fraises",
            category: "Produits transformés",
            price: 5.9,
            sales: 18,
            stock: 0,
            status: "rupture",
            image: "/vegetable.png",
        },
        {
            id: 8,
            name: "Pommes de terre nouvelles",
            category: "Légumes",
            price: 2.2,
            sales: 31,
            stock: 22,
            status: "disponible",
            image: "/vegetable.png",
        },
        {
            id: 9,
            name: "Yaourt nature fermier",
            category: "Produits laitiers",
            price: 3.2,
            sales: 26,
            stock: 0,
            status: "rupture",
            image: "/vegetable.png",
        },
        {
            id: 10,
            name: "Courgettes bio",
            category: "Légumes",
            price: 3.5,
            sales: 22,
            stock: 16,
            status: "disponible",
            image: "/vegetable.png",
        },
        {
            id: 11,
            name: "Pain de campagne",
            category: "Boulangerie",
            price: 4.8,
            sales: 19,
            stock: 8,
            status: "disponible",
            image: "/vegetable.png",
        },
        {
            id: 12,
            name: "Radis roses",
            category: "Légumes",
            price: 1.8,
            sales: 15,
            stock: 4,
            status: "stock_faible",
            image: "/vegetable.png",
        },
        {
            id: 13,
            name: "Carottes bio",
            category: "Légumes",
            price: 2.5,
            sales: 24,
            stock: 20,
            status: "disponible",
            image: "/vegetable.png",
        },
        {
            id: 14,
            name: "Beurre fermier",
            category: "Produits laitiers", 
            price: 4.2,
            sales: 32,
            stock: 0,
            status: "rupture",
            image: "/vegetable.png",
        },
        {
            id: 15,
            name: "Jus de pomme artisanal",
            category: "Produits transformés",
            price: 3.9,
            sales: 28,
            stock: 4,
            status: "stock_faible",
            image: "/vegetable.png",
        },
    ]
    
    // Filtrage des produits selon l'onglet actif et la recherche
    const getFilteredProducts = () => {
        let filtered = farmProducts

        // Filtrer par statut selon l'onglet
        switch (activeTab) {
            case "disponibles":
                filtered = farmProducts.filter((product) => product.status === "disponible")
                break
            case "stock_faible":
                filtered = farmProducts.filter((product) => product.status === "stock_faible")
                break
            case "rupture":
                filtered = farmProducts.filter((product) => product.status === "rupture")
                break
            default:
                filtered = farmProducts
        }

        // Filtrer par recherche
        if (searchQuery.trim()) {
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        return filtered
    }

    const getStockCount = (status: string) => {
        return farmProducts.filter((product) => product.status === status).length
    }

    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 15
    const totalPages = Math.ceil(getFilteredProducts().length / productsPerPage)

    return (
        <Card className="border-0 shadow-md mb-8">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold text-farm-green-dark">Produits de la ferme</CardTitle>
                        <CardDescription>Gérez votre catalogue de produits</CardDescription>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-farm-green border-farm-green hover:bg-farm-green/10"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Ajouter un produit
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {/* Barre de recherche */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Rechercher un produit ou une catégorie..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-11 rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-colors"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    {searchQuery && (
                        <p className="text-sm text-gray-600 mt-2">
                            {getFilteredProducts().length} résultat(s) pour "{searchQuery}"
                        </p>
                    )}
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                        <TabsTrigger value="tous" className="relative">
                            Tous
                            <Badge className="ml-2 bg-gray-100 text-gray-800 text-xs">{farmProducts.length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="disponibles" className="relative">
                            Disponibles
                            <Badge className="ml-2 bg-green-100 text-green-800 text-xs">{getStockCount("disponible")}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="stock_faible" className="relative">
                            Stock faible
                            <Badge className="ml-2 bg-orange-100 text-orange-800 text-xs">
                                {getStockCount("stock_faible")}
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger value="rupture" className="relative">
                            Rupture
                            <Badge className="ml-2 bg-red-100 text-red-800 text-xs">{getStockCount("rupture")}</Badge>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                            {getFilteredProducts().map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-farm-green/20 transition-all duration-300 overflow-hidden"
                                >
                                    {/* Image container */}
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        />

                                        {/* Status overlay for out of stock */}
                                        {product.status === "rupture" && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <div className="text-center text-white">
                                                    <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                                                    <span className="text-sm font-medium">Rupture</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Status badge */}
                                        <div className="absolute top-3 left-3">
                                            {product.status === "rupture" ? (
                                                <Badge className="bg-red-500 text-white border-0 shadow-lg">Rupture</Badge>
                                            ) : product.status === "stock_faible" ? (
                                                <Badge className="bg-orange-500 text-white border-0 shadow-lg">Stock faible</Badge>
                                            ) : (
                                                <Badge className="bg-green-500 text-white border-0 shadow-lg">Disponible</Badge>
                                            )}
                                        </div>

                                        {/* Action buttons overlay */}
                                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <div className="flex flex-col space-y-2">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg"
                                                >
                                                    <Edit className="w-4 h-4 text-farm-green-dark" />
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-lg"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        {/* Product name and category */}
                                        <div className="mb-3">
                                            <h4 className="font-semibold text-farm-green-dark text-sm leading-tight mb-1 line-clamp-2">
                                                {product.name}
                                            </h4>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                                {product.category}
                                            </p>
                                        </div>

                                        {/* Price */}
                                        <div className="mb-3">
                                            <span className="text-xl font-bold text-farm-green-dark">{product.price.toFixed(2)} €</span>
                                        </div>

                                        {/* Stats */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-600 flex items-center">
                                                    <ShoppingBasket className="w-3 h-3 mr-1" />
                                                    Vendus
                                                </span>
                                                <span className="font-semibold text-farm-green-dark bg-farm-green/10 px-2 py-1 rounded-full">
                                                    {product.sales}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-600 flex items-center">
                                                    <Package className="w-3 h-3 mr-1" />
                                                    Stock
                                                </span>
                                                <span
                                                    className={`font-semibold px-2 py-1 rounded-full ${product.stock === 0
                                                        ? "text-red-700 bg-red-100"
                                                        : product.stock <= 5
                                                            ? "text-orange-700 bg-orange-100"
                                                            : "text-green-700 bg-green-100"
                                                        }`}
                                                >
                                                    {product.stock}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Progress bar for stock level */}
                                        {/* <div className="mt-3">
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${product.stock === 0
                                                                ? "bg-red-500 w-0"
                                                                : product.stock <= 5
                                                                    ? "bg-orange-500"
                                                                    : "bg-green-500"
                                                            }`}
                                                        style={{
                                                            width: product.stock === 0 ? "0%" : `${Math.min((product.stock / 30) * 100, 100)}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div> */}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Paginate
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />

                        {getFilteredProducts().length === 0 && (
                            <div className="text-center py-12">
                                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
                                <p className="text-gray-500">
                                    {activeTab === "tous"
                                        ? "Vous n'avez pas encore ajouté de produits."
                                        : `Aucun produit dans la catégorie "${activeTab}".`}
                                </p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

export default FarmProducts