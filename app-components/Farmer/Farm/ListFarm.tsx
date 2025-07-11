"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
    Search,
    Plus,
    Grid3X3,
    List,
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
    SortAsc,
    SortDesc,
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
import { useFarm2 } from "@/app/FarmContext2"
import FarmCard from "@/app-components/molecules/FarmCard"
import FarmCardDetail from "@/app-components/FarmCardDetail"

export default function ListFarm() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterType, setFilterType] = useState("all")

    const userContext = useUser()
    const farmContext = useFarm2()

    if (!userContext) {
        return <div>Erreur : Contexte utilisateur non disponible</div>
    }

    if (!farmContext) {
        return <div>Erreur : Contexte ferme non disponible</div>
    }

    const { farms: farmsByUser, setFarms, selectedFarm } = farmContext

    // Filtrage et tri des fermes
    const getFilteredAndSortedFarms = () => {
        let filtered = farmsByUser

        // Filtrage par recherche
        if (searchQuery.trim()) {
            filtered = filtered.filter(
                (farm) =>
                    farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    farm.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    farm.type?.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        // Filtrage par statut
        if (filterStatus !== "all") {
            filtered = filtered.filter((farm) => farm.status === filterStatus)
        }

        // Filtrage par type
        if (filterType !== "all") {
            filtered = filtered.filter((farm) => farm.type?.toLowerCase().includes(filterType.toLowerCase()))
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
                    aValue = new Date(a.createdAt).getTime()
                    bValue = new Date(b.createdAt).getTime()
                    break
                case "sales":
                    aValue = a.totalSales ? Number.parseFloat(a.totalSales.replace(/[€\s]/g, "").replace(",", ".")) : 0
                    bValue = b.totalSales ? Number.parseFloat(b.totalSales.replace(/[€\s]/g, "").replace(",", ".")) : 0
                    break
                case "rating":
                    aValue = a.rating
                    bValue = b.rating
                    break
                default:
                    return 0
            }

            if (sortOrder === "asc") {
                return aValue && bValue ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) : 0
            } else {
                return aValue && bValue ? (aValue > bValue ? -1 : aValue < bValue ? 1 : 0) : 0
            }
        })

        return filtered
    }

    const toggleFarmStatus = (farmId: number) => {
        const updatedFarms = farmsByUser.map((farm) => {
            if (farm.id === farmId) {
                return {
                    ...farm,
                    status: farm.status === "on"? "off" : "on",
                }
            }
            return farm
        })

        setFarms(updatedFarms)
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "on":
                return <Badge className="bg-green-100 text-green-800 border-green-200">Disponible</Badge>
            case "off":
                return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Indisponible</Badge>
            case "pending":
                return <Badge className="bg-orange-100 text-orange-800 border-orange-200">En attente</Badge>
            default:
                return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inconnu</Badge>
        }
    }

    const filteredFarms = getFilteredAndSortedFarms()

    return (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[var(--farm-beige-light)]">
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
                                <p className="text-2xl font-bold text-farm-green-dark">{farmsByUser.length}</p>
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
                                    {farmsByUser.filter((f) => f.status === "on").length}
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
                        <FarmCardDetail key={farm.id} farm={farm} />
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
                                                <div className="text-sm text-gray-900">{farm.address}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(farm.status)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {/* <div className="text-sm font-medium text-gray-900">{farm.products}</div> */}
                                                <div className="text-sm font-medium text-gray-900">0</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {/* <div className="text-sm font-medium text-gray-900">{farm.customers}</div> */}
                                                <div className="text-sm font-medium text-gray-900">0</div>
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
                                                            {farm.status === "on" ? (
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
    )
}
