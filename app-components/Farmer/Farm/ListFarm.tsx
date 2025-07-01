"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
    ArrowLeft,
    Search,
    Plus,
    Grid3X3,
    List,
    MapPin,
    Users,
    Package,
    Star,
    MoreVertical,
    Edit,
    Eye,
    Trash2,
    Power,
    PowerOff,
    Leaf,
    Award,
    SortAsc,
    SortDesc,
    Target,
    CircleArrowUp,
    CircleArrowDown,
    CircleCheckBig,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/app/UserContext"
import { Farm } from "@/types"

export default function ListFarm() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterType, setFilterType] = useState("all")

    const [userFarms, setUserFarms] = useState<Farm[]>([])
    const { currentUser, refreshUser } = useUser()

    // Données des fermes
    const [farms, setFarms] = useState([
        {
            id: 1,
            name: "Ferme des Oliviers",
            location: "Aix-en-Provence, Provence-Alpes-Côte d'Azur",
            type: "Bio & Légumes",
            isActive: true,
            avatar: "FO",
            color: "bg-[var(--farm-green)]",
            description: "Exploitation familiale depuis 3 générations, spécialisée dans l'agriculture biologique.",
            products: 28,
            customers: 156,
            rating: 4.8,
            totalSales: "24 580 €",
            monthlyOrders: 89,
            joinDate: "2022-03-15",
            // certifications: ["AB", "HVE"],
            image: "/farm.jpg",
            status: "active",
            lastActivity: "Il y a 2 heures",
        },
        {
            id: 2,
            name: "Les Jardins de Marie",
            location: "Tours, Centre-Val de Loire",
            type: "Fruits & Légumes",
            isActive: false,
            avatar: "JM",
            color: "bg-[var(--farm-orange)]",
            description: "Ferme spécialisée dans les fruits de saison et légumes primeurs.",
            products: 15,
            customers: 89,
            rating: 4.6,
            totalSales: "12 340 €",
            monthlyOrders: 45,
            joinDate: "2021-07-22",
            // certifications: ["AB"],
            image: "/farm.jpg",
            status: "inactive",
            lastActivity: "Il y a 5 jours",
        },
        {
            id: 3,
            name: "Élevage du Soleil",
            location: "Caen, Normandie",
            type: "Produits laitiers",
            isActive: true,
            avatar: "ES",
            color: "bg-blue-600",
            description: "Élevage de vaches laitières et production de fromages fermiers.",
            products: 12,
            customers: 67,
            rating: 4.9,
            totalSales: "18 920 €",
            monthlyOrders: 34,
            joinDate: "2020-11-08",
            // certifications: ["Label Rouge", "AOP"],
            image: "/farm.jpg",
            status: "active",
            lastActivity: "Il y a 1 heure",
        },
        {
            id: 4,
            name: "Maraîchage Bio du Midi",
            location: "Montpellier, Occitanie",
            type: "Légumes Bio",
            isActive: true,
            avatar: "MB",
            color: "bg-green-600",
            description: "Production de légumes biologiques en circuit court.",
            products: 22,
            customers: 134,
            rating: 4.7,
            totalSales: "16 750 €",
            monthlyOrders: 67,
            joinDate: "2023-01-12",
            // certifications: ["AB", "Demeter"],
            image: "/farm.jpg",
            status: "active",
            lastActivity: "Il y a 30 minutes",
        },
        {
            id: 5,
            name: "Vergers de Bretagne",
            location: "Rennes, Bretagne",
            type: "Fruits",
            isActive: false,
            avatar: "VB",
            color: "bg-red-600",
            description: "Vergers traditionnels avec pommes, poires et fruits rouges.",
            products: 8,
            customers: 45,
            rating: 4.4,
            totalSales: "8 430 €",
            monthlyOrders: 23,
            joinDate: "2022-09-03",
            // certifications: ["HVE"],
            image: "/farm.jpg",
            status: "pending",
            lastActivity: "Il y a 2 semaines",
        },
    ])

    const fetchFarms = async () => {
        try {
            const token = localStorage.getItem('jwt_token')
            if (!token) {
                throw new Error('Token d\'authentification non trouvé')
            }

            const options = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/api/public/v1/farms/farmer/${currentUser?.id}`, options)
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données de l\'utilisateur')
            }

            const data = await response.json()
            setUserFarms(data)
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'utilisateur :', error)
        }
    }

    const getActiveFarms = () => {
        return farms.filter((farm) => farm.status === "on")
    }

    useEffect(() => {
        try {
            fetchFarms()
        } catch (error) {
            console.error('Impossible d\'accéder à la requête :', error)
        }
    }, [])

    // Filtrage et tri des fermes
    const getFilteredAndSortedFarms = () => {
        let filtered = farms

        // Filtrage par recherche
        if (searchQuery.trim()) {
            filtered = filtered.filter(
                (farm) =>
                    farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    farm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    farm.type.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        // Filtrage par statut
        if (filterStatus !== "all") {
            filtered = filtered.filter((farm) => farm.status === filterStatus)
        }

        // Filtrage par type
        if (filterType !== "all") {
            filtered = filtered.filter((farm) => farm.type.toLowerCase().includes(filterType.toLowerCase()))
        }

        // Tri
        filtered.sort((a, b) => {
            let aValue, bValue

            switch (sortBy) {
                case "name":
                    aValue = a.name.toLowerCase()
                    bValue = b.name.toLowerCase()
                    break
                case "date":
                    aValue = new Date(a.joinDate).getTime()
                    bValue = new Date(b.joinDate).getTime()
                    break
                case "sales":
                    aValue = Number.parseFloat(a.totalSales.replace(/[€\s]/g, "").replace(",", "."))
                    bValue = Number.parseFloat(b.totalSales.replace(/[€\s]/g, "").replace(",", "."))
                    break
                case "rating":
                    aValue = a.rating
                    bValue = b.rating
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

    const toggleFarmStatus = (farmId: number) => {
        setFarms((prev) =>
            prev.map((farm) =>
                farm.id === farmId
                    ? {
                        ...farm,
                        isActive: !farm.isActive,
                        status: farm.isActive ? "inactive" : "active",
                    }
                    : farm,
            ),
        )
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
            case "inactive":
                return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>
            case "pending":
                return <Badge className="bg-orange-100 text-orange-800 border-orange-200">En attente</Badge>
            default:
                return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inconnu</Badge>
        }
    }

    const filteredFarms = getFilteredAndSortedFarms()



    return (
        <div className="min-h-screen bg-[var(--farm-beige-light)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* En-tête de la page */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-farm-green-dark mb-2">Mes fermes</h1>
                        <p className="text-gray-600">Gérez toutes vos exploitations depuis un seul endroit</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Button asChild className="bg-[var(--farm-green)] hover:bg-[var(--farm-green-dark)] text-white">
                            <Link href="/fermier/add-farm">
                                <Plus className="w-4 h-4 mr-2" />
                                Ajouter une ferme
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="border-0 shadow-md">
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total fermes</p>
                                    <p className="text-2xl font-bold text-farm-green-dark">{userFarms.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-[var(--farm-green)]/10 rounded-full flex items-center justify-center">
                                    <Leaf className="w-6 h-6 text-farm-green" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Fermes actives</p>
                                    <p className="text-2xl font-bold text-farm-green-dark">
                                        {userFarms.filter((f) => f.status === "on").length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Power className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total produits</p>
                                    <p className="text-2xl font-bold text-farm-green-dark">
                                        {/* {farms.reduce((sum, farm) => sum + farm.products, 0)} */}
                                        0
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-[var(--farm-orange)]/10 rounded-full flex items-center justify-center">
                                    <Package className="w-6 h-6 text-farm-orange" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total clients</p>
                                    <p className="text-2xl font-bold text-farm-green-dark">
                                        {/* {farms.reduce((sum, farm) => sum + farm.customers, 0)} */}
                                        0
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Barre d'outils */}
                <Card className="border-0 shadow-md mb-8">
                    <CardContent className="px-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                            {/* Recherche */}
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="search"
                                        placeholder="Rechercher une ferme..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Filtres et options */}
                            <div className="flex items-center space-x-4">
                                {/* Filtre par statut */}
                                <Select value={filterStatus} onValueChange={setFilterStatus}>
                                    <SelectTrigger className="w-40 h-11">
                                        <SelectValue placeholder="Statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les statuts</SelectItem>
                                        <SelectItem value="active">Actives</SelectItem>
                                        <SelectItem value="inactive">Inactives</SelectItem>
                                        <SelectItem value="pending">En attente</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Filtre par type */}
                                <Select value={filterType} onValueChange={setFilterType}>
                                    <SelectTrigger className="w-40 h-11">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les types</SelectItem>
                                        <SelectItem value="bio">Bio</SelectItem>
                                        <SelectItem value="légumes">Légumes</SelectItem>
                                        <SelectItem value="fruits">Fruits</SelectItem>
                                        <SelectItem value="laitiers">Produits laitiers</SelectItem>
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
                                        <DropdownMenuItem onClick={() => setSortBy("date")}>
                                            <span className={sortBy === "date" ? "font-medium" : ""}>Date de création</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy("sales")}>
                                            <span className={sortBy === "sales" ? "font-medium" : ""}>Ventes</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setSortBy("rating")}>
                                            <span className={sortBy === "rating" ? "font-medium" : ""}>Note</span>
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

                        {/* Résultats de recherche */}
                        {searchQuery && (
                            <div className="mt-4 text-sm text-gray-600">
                                {filteredFarms.length} résultat(s) pour "{searchQuery}"
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Liste des fermes */}
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredFarms.map((farm) => (
                            <Card key={farm.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-0">
                                <div className="relative">
                                    <img
                                        src={farm.image || "/placeholder.svg"}
                                        alt={farm.name}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                    <div className="absolute top-4 left-4">{getStatusBadge(farm.status)}</div>
                                    <div className="absolute top-4 right-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                {farm.id === 1 ? (
                                                    <DropdownMenuItem className="text-blue-500">
                                                        <CircleCheckBig className="w-4 h-4 mr-2" />
                                                        Ferme montée
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem>
                                                        <CircleArrowUp className="w-4 h-4 mr-2" />
                                                        Monter la ferme
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Voir les détails
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => toggleFarmStatus(farm.id)}>
                                                    {farm.isActive ? (
                                                        <>
                                                            <PowerOff className="w-4 h-4 mr-2" />
                                                            Désactiver
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Power className="w-4 h-4 mr-2" />
                                                            Activer
                                                        </>
                                                    )}
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

                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-12 w-12">
                                                <AvatarFallback className={`${farm.color} text-white font-semibold`}>
                                                    {farm.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold text-farm-green-dark text-lg">{farm.name}</h3>
                                                <p className="text-sm text-gray-600">{farm.type}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600 mb-3">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {farm.location}
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{farm.description}</p>

                                    {/* Certifications */}
                                    {/* <div className="flex flex-wrap gap-2 mb-4">
                                        {farm.certifications.map((cert, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                <Award className="w-3 h-3 mr-1" />
                                                {cert}
                                            </Badge>
                                        ))}
                                    </div> */}

                                    {/* Statistiques */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <p className="text-lg font-bold text-farm-green-dark">{farm.products}</p>
                                            <p className="text-xs text-gray-600">Produits</p>
                                        </div>
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <p className="text-lg font-bold text-farm-green-dark">{farm.customers}</p>
                                            <p className="text-xs text-gray-600">Clients</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className="text-sm font-medium">{farm.rating}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-farm-green-dark">{farm.totalSales}</p>
                                            <p className="text-xs text-gray-600">Ventes totales</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-xs text-gray-500">Dernière activité: {farm.lastActivity}</p>
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
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ferme
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Localisation
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Statut
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Produits
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Clients
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ventes
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Note
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredFarms.map((farm) => (
                                            <tr key={farm.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <Avatar className="h-10 w-10 mr-3">
                                                            <AvatarFallback className={`${farm.color} text-white font-semibold`}>
                                                                {farm.avatar}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{farm.name}</div>
                                                            <div className="text-sm text-gray-500">{farm.type}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{farm.location}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(farm.status)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{farm.products}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{farm.customers}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{farm.totalSales}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                                        <span className="text-sm font-medium">{farm.rating}</span>
                                                    </div>
                                                </td>
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
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => toggleFarmStatus(farm.id)}>
                                                                {farm.isActive ? (
                                                                    <>
                                                                        <PowerOff className="w-4 h-4 mr-2" />
                                                                        Désactiver
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Power className="w-4 h-4 mr-2" />
                                                                        Activer
                                                                    </>
                                                                )}
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

                {/* Message si aucune ferme */}
                {filteredFarms.length === 0 && (
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-12 text-center">
                            <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune ferme trouvée</h3>
                            <p className="text-gray-600 mb-6">
                                {searchQuery
                                    ? `Aucune ferme ne correspond à "${searchQuery}".`
                                    : "Vous n'avez pas encore ajouté de fermes."}
                            </p>
                            <Button asChild className="bg-[var(--farm-green)] hover:bg-[var(--farm-green-dark)] text-white">
                                <Link href="/fermier/add-farm">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Ajouter votre première ferme
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
