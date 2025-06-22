"use client"

import { useState } from "react"
import Link from "next/link"
import {
    ArrowLeft,
    Search,
    Plus,
    Grid3X3,
    List,
    MoreVertical,
    Edit,
    Eye,
    Trash2,
    Copy,
    Package,
    Star,
    Calendar,
    Euro,
    Leaf,
    SortAsc,
    SortDesc,
    Download,
    Upload,
    CheckSquare,
    X,
    ShoppingCart,
    BarChart3,
    ImageIcon,
    Tag,
    ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ProductsManagement() {
    // Données des fermes de l'utilisateur
    const [userFarms] = useState([
        {
            id: 1,
            name: "Ferme des Oliviers",
            location: "Aix-en-Provence, Provence",
            type: "Bio & Légumes",
            isActive: true,
            avatar: "FO",
            color: "bg-[var(--farm-green)]",
        },
        {
            id: 2,
            name: "Les Jardins de Marie",
            location: "Tours, Loire",
            type: "Fruits & Légumes",
            isActive: false,
            avatar: "JM",
            color: "bg-[var(--farm-orange)]",
        },
        {
            id: 3,
            name: "Élevage du Soleil",
            location: "Caen, Normandie",
            type: "Produits laitiers",
            isActive: false,
            avatar: "ES",
            color: "bg-blue-600",
        },
    ])

    const [activeFarmId, setActiveFarmId] = useState(1)
    const activeFarm = userFarms.find((farm) => farm.id === activeFarmId) || userFarms[0]

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [filterCategory, setFilterCategory] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterStock, setFilterStock] = useState("all")
    const [selectedProducts, setSelectedProducts] = useState<number[]>([])
    const [showFilters, setShowFilters] = useState(false)

    // Données des produits - ajouter farmId à chaque produit
    const [products, setProducts] = useState([
        {
            id: 1,
            farmId: 1, // Ferme des Oliviers
            name: "Panier de légumes bio",
            category: "Légumes",
            price: 24.9,
            originalPrice: 29.9,
            sales: 42,
            stock: 18,
            status: "disponible",
            image: "/vegetable.png",
            description: "Assortiment de légumes de saison cultivés en agriculture biologique",
            sku: "FO-LEG-001",
            weight: "2.5kg",
            season: "Toute l'année",
            lastUpdated: "2024-01-15",
            isPromoted: true,
            tags: ["bio", "local", "saison"],
        },
        {
            id: 2,
            farmId: 1, // Ferme des Oliviers
            name: "Œufs fermiers (x12)",
            category: "Produits laitiers",
            price: 4.5,
            originalPrice: null,
            sales: 36,
            stock: 24,
            status: "disponible",
            image: "/vegetable.png",
            description: "Œufs frais de poules élevées en plein air",
            sku: "FO-LAI-001",
            weight: "720g",
            season: "Toute l'année",
            lastUpdated: "2024-01-14",
            isPromoted: false,
            tags: ["fermier", "plein-air"],
        },
        {
            id: 3,
            farmId: 2, // Les Jardins de Marie
            name: "Pommes Golden",
            category: "Fruits",
            price: 3.2,
            originalPrice: null,
            sales: 45,
            stock: 30,
            status: "disponible",
            image: "/vegetable.png",
            description: "Pommes Golden de nos vergers",
            sku: "JM-FRU-001",
            weight: "1kg",
            season: "Automne-Hiver",
            lastUpdated: "2024-01-14",
            isPromoted: false,
            tags: ["golden", "verger"],
        },
        {
            id: 4,
            farmId: 3, // Élevage du Soleil
            name: "Lait frais fermier",
            category: "Produits laitiers",
            price: 2.8,
            originalPrice: null,
            sales: 67,
            stock: 15,
            status: "disponible",
            image: "/vegetable.png",
            description: "Lait frais de nos vaches normandes",
            sku: "ES-LAI-001",
            weight: "1L",
            season: "Toute l'année",
            lastUpdated: "2024-01-13",
            isPromoted: false,
            tags: ["frais", "normande"],
        },
        // Ajouter plus de produits pour chaque ferme...
        {
            id: 5,
            farmId: 1, // Ferme des Oliviers
            name: "Miel de fleurs sauvages",
            category: "Produits transformés",
            price: 8.9,
            originalPrice: null,
            sales: 28,
            stock: 15,
            status: "disponible",
            image: "/vegetable.png",
            description: "Miel artisanal récolté dans nos ruches",
            sku: "FO-TRA-001",
            weight: "250g",
            season: "Printemps-Été",
            lastUpdated: "2024-01-13",
            isPromoted: false,
            tags: ["artisanal", "local"],
        },
        {
            id: 6,
            farmId: 2, // Les Jardins de Marie
            name: "Fraises de saison",
            category: "Fruits",
            price: 5.5,
            originalPrice: null,
            sales: 38,
            stock: 8,
            status: "disponible",
            image: "/vegetable.png",
            description: "Fraises fraîches de nos serres",
            sku: "JM-FRU-002",
            weight: "500g",
            season: "Printemps-Été",
            lastUpdated: "2024-01-12",
            isPromoted: true,
            tags: ["fraises", "serre"],
        },
        {
            id: 7,
            farmId: 3, // Élevage du Soleil
            name: "Fromage de Normandie",
            category: "Produits laitiers",
            price: 12.5,
            originalPrice: null,
            sales: 23,
            stock: 6,
            status: "stock_faible",
            image: "/vegetable.png",
            description: "Fromage fermier au lait cru",
            sku: "ES-LAI-002",
            weight: "300g",
            season: "Toute l'année",
            lastUpdated: "2024-01-11",
            isPromoted: false,
            tags: ["fermier", "lait-cru"],
        },
    ])

    const categories = ["Légumes", "Produits laitiers", "Produits transformés", "Boulangerie", "Fruits"]

    // Filtrage et tri des produits - modifier pour inclure le filtre par ferme
    const getFilteredAndSortedProducts = () => {
        // D'abord filtrer par ferme active
        let filtered = products.filter((product) => product.farmId === activeFarmId)

        // Filtrage par recherche
        if (searchQuery.trim()) {
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
            )
        }

        // Filtrage par catégorie
        if (filterCategory !== "all") {
            filtered = filtered.filter((product) => product.category === filterCategory)
        }

        // Filtrage par statut
        if (filterStatus !== "all") {
            filtered = filtered.filter((product) => product.status === filterStatus)
        }

        // Filtrage par stock
        if (filterStock !== "all") {
            switch (filterStock) {
                case "in_stock":
                    filtered = filtered.filter((product) => product.stock > 5)
                    break
                case "low_stock":
                    filtered = filtered.filter((product) => product.stock > 0 && product.stock <= 5)
                    break
                case "out_of_stock":
                    filtered = filtered.filter((product) => product.stock === 0)
                    break
            }
        }

        // Tri
        filtered.sort((a, b) => {
            let aValue, bValue

            switch (sortBy) {
                case "name":
                    aValue = a.name.toLowerCase()
                    bValue = b.name.toLowerCase()
                    break
                case "price":
                    aValue = a.price
                    bValue = b.price
                    break
                case "sales":
                    aValue = a.sales
                    bValue = b.sales
                    break
                case "stock":
                    aValue = a.stock
                    bValue = b.stock
                    break
                case "updated":
                    aValue = new Date(a.lastUpdated).getTime()
                    bValue = new Date(b.lastUpdated).getTime()
                    break
                default:
                    return 0
            }

            if (sortOrder === "asc") {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
            }
        })

        return filtered
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "disponible":
                return <Badge className="bg-green-100 text-green-800 border-green-200">Disponible</Badge>
            case "stock_faible":
                return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Stock faible</Badge>
            case "rupture":
                return <Badge className="bg-red-100 text-red-800 border-red-200">Rupture</Badge>
            case "brouillon":
                return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Brouillon</Badge>
            default:
                return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inconnu</Badge>
        }
    }

    // Statistiques pour la ferme active uniquement
    const farmProducts = products.filter((product) => product.farmId === activeFarmId)
    const totalProducts = farmProducts.length
    const totalValue = farmProducts.reduce((sum, product) => sum + product.price * product.stock, 0)
    const totalSales = farmProducts.reduce((sum, product) => sum + product.sales, 0)
    // const averageRating =
    //     farmProducts.length > 0 ? farmProducts.reduce((sum, product) => sum + product.rating, 0) / farmProducts.length : 0

    const getStockCount = (status: string) => {
        return farmProducts.filter((product) => product.status === status).length
    }

    const toggleProductSelection = (productId: number) => {
        setSelectedProducts((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
        )
    }

    const selectAllProducts = () => {
        const filteredProducts = getFilteredAndSortedProducts()
        setSelectedProducts(filteredProducts.map((p) => p.id))
    }

    const clearSelection = () => {
        setSelectedProducts([])
    }

    const filteredProducts = getFilteredAndSortedProducts()

    return (
        <div className="min-h-screen bg-[var(--farm-beige-light)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* En-tête de la page - modifier pour inclure la ferme */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-farm-green-dark mb-2">Gestion des produits</h1>
                        <div className="flex items-center space-x-2">
                            <p className="text-gray-600">Gérez votre catalogue de produits et suivez vos performances</p>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center space-x-3">
                        {/* <Button variant="outline" className="border-farm-green text-farm-green hover:bg-[var(--farm-green)]/10">
                            <Download className="w-4 h-4 mr-2" />
                            Exporter
                        </Button>
                        <Button variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green/10">
                            <Upload className="w-4 h-4 mr-2" />
                            Importer
                        </Button> */}
                        <Button asChild className="bg-[var(--farm-green)] hover:bg-[var(--farm-green-dark)] text-white">
                            <Link
                                href="/fermier/produits/ajouter-produit"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Ajouter un produit
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="border-0 shadow-md">
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm text-gray-600">Ferme sélectionnée</p>
                                    <p className="text-lg font-bold text-farm-green-dark">{activeFarm.name}</p>
                                </div>
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback className={`${activeFarm.color} text-white font-semibold`}>
                                        {activeFarm.avatar}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between border-farm-green/20 hover:bg-[var(--farm-green)]/5"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 rounded-full bg-[var(--farm-green)]"></div>
                                            <span className="text-sm">Changer de ferme</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-80 p-2" align="end">
                                    <DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
                                        Sélectionner une ferme
                                    </DropdownMenuLabel>

                                    {userFarms.map((farm) => (
                                        <DropdownMenuItem
                                            key={farm.id}
                                            onClick={() => setActiveFarmId(farm.id)}
                                            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${farm.id === activeFarmId ? "bg-[var(--farm-green)]/10 border border-farm-green/20" : "hover:bg-gray-50"
                                                }`}
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className={`${farm.color} text-white font-semibold text-sm`}>
                                                    {farm.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <p className="font-medium text-gray-900 text-sm truncate">{farm.name}</p>
                                                    {farm.id === activeFarmId && (
                                                        <Badge className="bg-[var(--farm-green)] text-white text-xs border-0">Active</Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500">{farm.location}</p>
                                                <p className="text-xs text-gray-400">{farm.type}</p>
                                            </div>
                                        </DropdownMenuItem>
                                    ))}

                                    <div className="px-3 py-2 mt-2 bg-[var(--farm-beige)]/50 rounded-lg">
                                        <p className="text-xs text-gray-600 mb-1">💡 Astuce</p>
                                        <p className="text-xs text-gray-500">
                                            Les statistiques et produits s'adaptent automatiquement à la ferme sélectionnée.
                                        </p>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total produits</p>
                                    {/* <p className="text-2xl font-bold text-farm-green-dark">{totalProducts}</p> */}
                                    <p className="text-2xl font-bold text-farm-green-dark">0</p>
                                </div>
                                <div className="w-12 h-12 bg-[var(--farm-green)]/10 rounded-full flex items-center justify-center">
                                    <Package className="w-6 h-6 text-farm-green" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Valeur du stock</p>
                                    {/* <p className="text-2xl font-bold text-farm-green-dark">{totalValue.toFixed(0)} €</p> */}
                                    <p className="text-2xl font-bold text-farm-green-dark">0 €</p>
                                </div>
                                <div className="w-12 h-12 bg-[var(--farm-orange)]/10 rounded-full flex items-center justify-center">
                                    <Euro className="w-6 h-6 text-farm-orange" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Ventes totales</p>
                                    {/* <p className="text-2xl font-bold text-farm-green-dark">{totalSales}</p> */}
                                    <p className="text-2xl font-bold text-farm-green-dark">0</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Onglets de statut */}
                <Tabs defaultValue="tous" className="mb-8">
                    <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-xl">
                        <TabsTrigger
                            value="tous"
                            className="data-[state=active]:bg-[var(--farm-green)] data-[state=active]:text-white rounded-lg"
                        >
                            <div className="flex items-center space-x-2">
                                <Package className="w-4 h-4" />
                                <span>Tous</span>
                                <Badge className="bg-gray-100 text-gray-800 text-xs border-0">{totalProducts}</Badge>
                            </div>
                        </TabsTrigger>
                        <TabsTrigger
                            value="disponibles"
                            className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg"
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span>Disponibles</span>
                                <Badge className="bg-green-100 text-green-800 text-xs border-0">{getStockCount("disponible")}</Badge>
                            </div>
                        </TabsTrigger>
                        <TabsTrigger
                            value="stock_faible"
                            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-lg"
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                <span>Stock faible</span>
                                <Badge className="bg-orange-100 text-orange-800 text-xs border-0">
                                    {getStockCount("stock_faible")}
                                </Badge>
                            </div>
                        </TabsTrigger>
                        <TabsTrigger
                            value="rupture"
                            className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg"
                        >
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span>Rupture</span>
                                <Badge className="bg-red-100 text-red-800 text-xs border-0">{getStockCount("rupture")}</Badge>
                            </div>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="tous" className="mt-6">
                        {/* Barre d'outils */}
                        <Card className="border-0 shadow-md mb-6">
                            <CardContent className="px-6">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                                    {/* Recherche */}
                                    <div className="flex-1 max-w-md">
                                        <div className="relative">
                                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <Input
                                                type="search"
                                                placeholder="Rechercher un produit, SKU, tag..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="pl-10 h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Filtres et options */}
                                    <div className="flex items-center space-x-4">
                                        {/* Filtre par catégorie */}
                                        <Select value={filterCategory} onValueChange={setFilterCategory}>
                                            <SelectTrigger className="w-40 h-11">
                                                <SelectValue placeholder="Catégorie" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Toutes catégories</SelectItem>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {/* Filtre par stock */}
                                        <Select value={filterStock} onValueChange={setFilterStock}>
                                            <SelectTrigger className="w-40 h-11">
                                                <SelectValue placeholder="Stock" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Tous les stocks</SelectItem>
                                                <SelectItem value="in_stock">En stock</SelectItem>
                                                <SelectItem value="low_stock">Stock faible</SelectItem>
                                                <SelectItem value="out_of_stock">Rupture</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {/* Tri */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="h-11">
                                                    {sortOrder === "asc" ? (
                                                        <SortAsc className="w-4 h-4 mr-2" />
                                                    ) : (
                                                        <SortDesc className="w-4 h-4 mr-2" />
                                                    )}
                                                    Trier
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuLabel>Trier par</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => setSortBy("name")}>
                                                    <span className={sortBy === "name" ? "font-medium" : ""}>Nom</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setSortBy("price")}>
                                                    <span className={sortBy === "price" ? "font-medium" : ""}>Prix</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setSortBy("sales")}>
                                                    <span className={sortBy === "sales" ? "font-medium" : ""}>Ventes</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setSortBy("stock")}>
                                                    <span className={sortBy === "stock" ? "font-medium" : ""}>Stock</span>
                                                </DropdownMenuItem>
                                                {/* <DropdownMenuItem onClick={() => setSortBy("rating")}>
                                                    <span className={sortBy === "rating" ? "font-medium" : ""}>Note</span>
                                                </DropdownMenuItem> */}
                                                <DropdownMenuItem onClick={() => setSortBy("updated")}>
                                                    <span className={sortBy === "updated" ? "font-medium" : ""}>Dernière MAJ</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                                                    {sortOrder === "asc" ? "Ordre décroissant" : "Ordre croissant"}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        {/* Mode d'affichage */}
                                        <div className="flex items-center border border-gray-200 rounded-lg p-1">
                                            <Button
                                                variant={viewMode === "grid" ? "default" : "ghost"}
                                                size="sm"
                                                onClick={() => setViewMode("grid")}
                                                className={viewMode === "grid" ? "bg-[var(--farm-green)] text-white" : ""}
                                            >
                                                <Grid3X3 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant={viewMode === "list" ? "default" : "ghost"}
                                                size="sm"
                                                onClick={() => setViewMode("list")}
                                                className={viewMode === "list" ? "bg-[var(--farm-green)] text-white" : ""}
                                            >
                                                <List className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Sélection multiple */}
                                {selectedProducts.length > 0 && (
                                    <div className="mt-4 p-4 bg-[var(--farm-green)]/10 rounded-lg border border-farm-green/20">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <CheckSquare className="w-5 h-5 text-farm-green" />
                                                <span className="font-medium text-farm-green-dark">
                                                    {selectedProducts.length} produit(s) sélectionné(s)
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="outline" size="sm" onClick={clearSelection}>
                                                    <X className="w-4 h-4 mr-1" />
                                                    Annuler
                                                </Button>
                                                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                                    <Trash2 className="w-4 h-4 mr-1" />
                                                    Supprimer
                                                </Button>
                                                <Button size="sm" className="bg-[var(--farm-green)] hover:bg-[var(--farm-green-dark)] text-white">
                                                    <Edit className="w-4 h-4 mr-1" />
                                                    Modifier en lot
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Résultats de recherche */}
                                {searchQuery && (
                                    <div className="mt-4 text-sm text-gray-600">
                                        {filteredProducts.length} résultat(s) pour "{searchQuery}"
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Liste des produits */}
                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map((product) => (
                                    <Card
                                        key={product.id}
                                        className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group p-0"
                                    >
                                        <div className="relative">
                                            <img
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />

                                            {/* Overlay de sélection */}
                                            <div className="absolute top-3 left-3">
                                                <Checkbox
                                                    checked={selectedProducts.includes(product.id)}
                                                    onCheckedChange={() => toggleProductSelection(product.id)}
                                                    className="bg-white/90 border-white"
                                                />
                                            </div>

                                            {/* Badge de statut */}
                                            <div className="absolute top-3 right-3">{getStatusBadge(product.status)}</div>

                                            {/* Badge promotion */}
                                            {/* {product.isPromoted && (
                                                <div className="absolute bottom-3 left-3">
                                                    <Badge className="bg-red-500 text-white">Promotion</Badge>
                                                </div>
                                            )} */}

                                            {/* Actions overlay */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2 rounded-t-lg">
                                                <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                                                    <Copy className="w-4 h-4" />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <BarChart3 className="w-4 h-4 mr-2" />
                                                            Voir les stats
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <ImageIcon className="w-4 h-4 mr-2" />
                                                            Gérer les images
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Supprimer
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>

                                        <CardContent className="p-4">
                                            {/* Nom et SKU */}
                                            <div className="mb-3">
                                            <p className="text-xs text-gray-400 mb-1">SKU: {product.sku}</p>
                                                <h3 className="font-semibold text-farm-green-dark text-lg leading-tight mb-1 line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                                        {product.category}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Prix */}
                                            <div className="mb-3">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xl font-bold text-farm-green-dark">{product.price.toFixed(2)} €</span>
                                                    {product.originalPrice && (
                                                        <span className="text-sm text-gray-500 line-through">
                                                            {product.originalPrice.toFixed(2)} €
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-600">{product.weight}</p>
                                            </div>

                                            {/* Tags */}
                                            {/* <div className="flex flex-wrap gap-1 mb-3">
                                                {product.tags.slice(0, 2).map((tag, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        <Tag className="w-2 h-2 mr-1" />
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                {product.tags.length > 2 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{product.tags.length - 2}
                                                    </Badge>
                                                )}
                                            </div> */}

                                            {/* Statistiques */}
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-600 flex items-center">
                                                        <ShoppingCart className="w-3 h-3 mr-1" />
                                                        Vendus
                                                    </span>
                                                    <span className="font-semibold text-farm-green-dark bg-[var(--farm-green)]/10 px-2 py-1 rounded-full">
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
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="px-6 py-4 text-left">
                                                        <Checkbox
                                                            checked={selectedProducts.length === filteredProducts.length}
                                                            onCheckedChange={
                                                                selectedProducts.length === filteredProducts.length ? clearSelection : selectAllProducts
                                                            }
                                                        />
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Produit
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Catégorie
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Prix
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Stock
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Ventes
                                                    </th>
                                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Statut
                                                    </th>
                                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {filteredProducts.map((product) => (
                                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <Checkbox
                                                                checked={selectedProducts.includes(product.id)}
                                                                onCheckedChange={() => toggleProductSelection(product.id)}
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <img
                                                                    className="h-12 w-12 rounded-lg object-cover mr-4"
                                                                    src={product.image || "/placeholder.svg"}
                                                                    alt={product.name}
                                                                />
                                                                <div>
                                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                                    <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{product.category}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">{product.price.toFixed(2)} €</div>
                                                            {product.originalPrice && (
                                                                <div className="text-sm text-gray-500 line-through">
                                                                    {product.originalPrice.toFixed(2)} €
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div
                                                                className={`text-sm font-medium ${product.stock === 0
                                                                        ? "text-red-600"
                                                                        : product.stock <= 5
                                                                            ? "text-orange-600"
                                                                            : "text-green-600"
                                                                    }`}
                                                            >
                                                                {product.stock}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">{product.sales}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(product.status)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="sm">
                                                                        <MoreVertical className="w-4 h-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem>
                                                                        <Eye className="w-4 h-4 mr-2" />
                                                                        Voir les détails
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Edit className="w-4 h-4 mr-2" />
                                                                        Modifier
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Copy className="w-4 h-4 mr-2" />
                                                                        Dupliquer
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem>
                                                                        <BarChart3 className="w-4 h-4 mr-2" />
                                                                        Voir les stats
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-red-600">
                                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                                        Supprimer
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Message si aucun produit - modifier pour mentionner la ferme */}
                        {filteredProducts.length === 0 && (
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-12 text-center">
                                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
                                    <p className="text-gray-600 mb-6">
                                        {searchQuery
                                            ? `Aucun produit ne correspond à "${searchQuery}" pour ${activeFarm.name}.`
                                            : `Vous n'avez pas encore ajouté de produits pour ${activeFarm.name}.`}
                                    </p>
                                    <Button asChild className="bg-[var(--farm-green)] hover:bg-[var(--farm-green-dark)] text-white">
                                        <Link href="/fermier/products/add">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Ajouter un produit à {activeFarm.name}
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}