"use client"

import { useState } from "react"
import {
    Package,
    Search,
    Download,
    Eye,
    Edit,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    MoreHorizontal,
    Calendar,
    Euro,
    User,
    Phone,
    MapPin,
    Printer,
    Mail,
    RefreshCw,
    ArrowUpDown,
    FileText,
    ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function OrdersList() {
    const [activeTab, setActiveTab] = useState("toutes")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOrders, setSelectedOrders] = useState<string[]>([])
    const [sortBy, setSortBy] = useState("date_desc")
    const [dateFilter, setDateFilter] = useState("all")
    const [selectedOrder, setSelectedOrder] = useState<any>(null)

    // Données fictives des commandes
    const orders = [
        {
            id: "CMD-2024-001",
            number: "2024-001",
            customer: {
                name: "Marie Dupont",
                email: "marie.dupont@email.com",
                phone: "06 12 34 56 78",
                avatar: "MD",
            },
            date: "2024-01-15T10:30:00",
            status: "nouvelle",
            statusLabel: "Nouvelle",
            amount: 86.5,
            items: 5,
            paymentStatus: "paid",
            deliveryType: "livraison",
            deliveryAddress: "123 Rue de la Paix, 75001 Paris",
            deliveryDate: "2024-01-16T14:00:00",
            products: [
                { name: "Panier de légumes bio", quantity: 2, price: 24.9 },
                { name: "Œufs fermiers (x12)", quantity: 3, price: 4.5 },
                { name: "Miel de fleurs", quantity: 1, price: 8.9 },
            ],
            notes: "Livraison en fin d'après-midi de préférence",
        },
        {
            id: "CMD-2024-002",
            number: "2024-002",
            customer: {
                name: "Thomas Martin",
                email: "thomas.martin@email.com",
                phone: "06 98 76 54 32",
                avatar: "TM",
            },
            date: "2024-01-15T09:15:00",
            status: "preparation",
            statusLabel: "En préparation",
            amount: 42.2,
            items: 3,
            paymentStatus: "paid",
            deliveryType: "retrait",
            deliveryAddress: "Ferme des Oliviers",
            deliveryDate: "2024-01-16T16:00:00",
            products: [
                { name: "Fromage de chèvre", quantity: 2, price: 6.2 },
                { name: "Salade verte bio", quantity: 4, price: 2.5 },
                { name: "Tomates cerises", quantity: 2, price: 3.8 },
            ],
            notes: "",
        },
        {
            id: "CMD-2024-003",
            number: "2024-003",
            customer: {
                name: "Sophie Bernard",
                email: "sophie.bernard@email.com",
                phone: "06 45 67 89 12",
                avatar: "SB",
            },
            date: "2024-01-14T16:45:00",
            status: "prete",
            statusLabel: "Prête à livrer",
            amount: 124.9,
            items: 8,
            paymentStatus: "paid",
            deliveryType: "livraison",
            deliveryAddress: "456 Avenue des Champs, 75008 Paris",
            deliveryDate: "2024-01-15T18:00:00",
            products: [
                { name: "Panier de légumes bio", quantity: 3, price: 24.9 },
                { name: "Miel de fleurs", quantity: 2, price: 8.9 },
                { name: "Pain de campagne", quantity: 2, price: 4.8 },
                { name: "Confiture de fraises", quantity: 1, price: 5.9 },
            ],
            notes: "Code d'accès : 1234A",
        },
        {
            id: "CMD-2024-004",
            number: "2024-004",
            customer: {
                name: "Pierre Durand",
                email: "pierre.durand@email.com",
                phone: "06 23 45 67 89",
                avatar: "PD",
            },
            date: "2024-01-14T14:20:00",
            status: "livraison",
            statusLabel: "En livraison",
            amount: 67.3,
            items: 4,
            paymentStatus: "paid",
            deliveryType: "livraison",
            deliveryAddress: "789 Rue du Commerce, 75011 Paris",
            deliveryDate: "2024-01-14T19:00:00",
            products: [
                { name: "Œufs fermiers (x12)", quantity: 4, price: 4.5 },
                { name: "Fromage de chèvre", quantity: 3, price: 6.2 },
                { name: "Yaourt nature", quantity: 6, price: 3.2 },
            ],
            notes: "Interphone : Durand",
        },
        {
            id: "CMD-2024-005",
            number: "2024-005",
            customer: {
                name: "Julie Moreau",
                email: "julie.moreau@email.com",
                phone: "06 87 65 43 21",
                avatar: "JM",
            },
            date: "2024-01-13T11:30:00",
            status: "livree",
            statusLabel: "Livrée",
            amount: 95.8,
            items: 6,
            paymentStatus: "paid",
            deliveryType: "retrait",
            deliveryAddress: "Marché central",
            deliveryDate: "2024-01-13T15:00:00",
            products: [
                { name: "Panier de légumes bio", quantity: 2, price: 24.9 },
                { name: "Miel de fleurs", quantity: 3, price: 8.9 },
                { name: "Pain de campagne", quantity: 1, price: 4.8 },
            ],
            notes: "Client régulier",
        },
        {
            id: "CMD-2024-006",
            number: "2024-006",
            customer: {
                name: "Antoine Leroy",
                email: "antoine.leroy@email.com",
                phone: "06 34 56 78 90",
                avatar: "AL",
            },
            date: "2024-01-12T08:45:00",
            status: "annulee",
            statusLabel: "Annulée",
            amount: 38.4,
            items: 2,
            paymentStatus: "refunded",
            deliveryType: "livraison",
            deliveryAddress: "321 Boulevard Saint-Germain, 75007 Paris",
            deliveryDate: "2024-01-13T10:00:00",
            products: [
                { name: "Salade verte bio", quantity: 6, price: 2.5 },
                { name: "Radis roses", quantity: 8, price: 1.8 },
            ],
            notes: "Annulation client - produits non disponibles",
        },
    ]

    // Statistiques des commandes
    const orderStats = [
        {
            title: "Nouvelles commandes",
            // value: orders.filter((o) => o.status === "nouvelle").length,
            value: 0,
            change: "Aucune donnée",
            trend: "up",
            icon: Package,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "En préparation",
            // value: orders.filter((o) => o.status === "preparation").length,
            value: 0,
            change: "Aucune donnée",
            trend: "up",
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            title: "Prêtes à livrer",
            // value: orders.filter((o) => o.status === "prete").length,
            value: 0,
            change: "Aucune donnée",
            trend: "down",
            icon: Truck,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Chiffre d'affaires",
            // value: `${orders
            //     .filter((o) => o.status !== "annulee")
            //     .reduce((sum, o) => sum + o.amount, 0)
            //     .toFixed(2)} €`,
            value: '0 €',
            change: "Aucune donnée",
            trend: "up",
            icon: Euro,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
    ]

    // Filtrage des commandes
    const getFilteredOrders = () => {
        let filtered = orders

        // Filtrer par statut selon l'onglet
        switch (activeTab) {
            case "nouvelles":
                filtered = orders.filter((o) => o.status === "nouvelle")
                break
            case "preparation":
                filtered = orders.filter((o) => o.status === "preparation")
                break
            case "pretes":
                filtered = orders.filter((o) => o.status === "prete")
                break
            case "livraison":
                filtered = orders.filter((o) => o.status === "livraison")
                break
            case "livrees":
                filtered = orders.filter((o) => o.status === "livree")
                break
            case "annulees":
                filtered = orders.filter((o) => o.status === "annulee")
                break
            default:
                filtered = orders
        }

        // Filtrer par recherche
        if (searchQuery.trim()) {
            filtered = filtered.filter(
                (order) =>
                    order.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        // Trier
        switch (sortBy) {
            case "date_desc":
                filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                break
            case "date_asc":
                filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                break
            case "amount_desc":
                filtered.sort((a, b) => b.amount - a.amount)
                break
            case "amount_asc":
                filtered.sort((a, b) => a.amount - b.amount)
                break
            case "customer":
                filtered.sort((a, b) => a.customer.name.localeCompare(b.customer.name))
                break
        }

        return filtered
    }

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            nouvelle: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Package },
            preparation: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: Clock },
            prete: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: CheckCircle },
            livraison: { color: "bg-indigo-100 text-indigo-800 border-indigo-200", icon: Truck },
            livree: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
            annulee: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
        }

        const config = statusConfig[status as keyof typeof statusConfig]
        const IconComponent = config.icon

        return (
            <Badge className={`${config.color} flex items-center space-x-1`}>
                <IconComponent className="w-3 h-3" />
                <span>{orders.find((o) => o.status === status)?.statusLabel}</span>
            </Badge>
        )
    }

    const getPaymentBadge = (paymentStatus: string) => {
        switch (paymentStatus) {
            case "paid":
                return <Badge className="bg-green-100 text-green-800 border-green-200">Payé</Badge>
            case "pending":
                return <Badge className="bg-orange-100 text-orange-800 border-orange-200">En attente</Badge>
            case "refunded":
                return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Remboursé</Badge>
            default:
                return <Badge className="bg-red-100 text-red-800 border-red-200">Impayé</Badge>
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const handleSelectOrder = (orderId: string) => {
        setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
    }

    const handleSelectAll = () => {
        const filteredOrders = getFilteredOrders()
        if (selectedOrders.length === filteredOrders.length) {
            setSelectedOrders([])
        } else {
            setSelectedOrders(filteredOrders.map((o) => o.id))
        }
    }

    const getOrderCount = (status: string) => {
        return orders.filter((order) => order.status === status).length
    }

    return (
        <div className="min-h-screen bg-[var(--farm-beige-light)]">
            {/* Header */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-farm-green-dark mb-2">Commandes reçues</h1>
                        <div className="flex items-center space-x-2">
                            <p className="text-gray-600">Gérez et traitez les commandes de vos clients</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Actualiser
                        </Button>
                        {/* <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Exporter
                        </Button>
                        <Button variant="outline" size="sm">
                            <Printer className="w-4 h-4 mr-2" />
                            Imprimer
                        </Button> */}
                        <Button className="bg-[var(--farm-green)] hover:bg-[var(--farm-green-dark)]">
                            <Truck className="w-4 h-4 mr-2" />
                            Organiser tournée
                        </Button>
                    </div>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {orderStats.map((stat, index) => (
                        <Card key={index} className="border-0 shadow-sm">
                            <CardContent className="px-6">
                                <div className="flex items-center justify-between">
                                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    {/* <div className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}> */}
                                    <div className={`text-sm font-medium text-gray-400`}>
                                        {stat.change}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-[var(--farm-green-dark)] mt-1">{stat.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Actions rapides */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-2">Nouvelles commandes</h3>
                                    <p className="text-sm text-blue-700 mb-4">
                                        {orders.filter((o) => o.status === "nouvelle").length} commandes à traiter
                                    </p>
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Traiter tout
                                    </Button>
                                </div>
                                <Package className="w-12 h-12 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-purple-900 mb-2">Prêtes à livrer</h3>
                                    <p className="text-sm text-purple-700 mb-4">
                                        {orders.filter((o) => o.status === "prete").length} commandes prêtes
                                    </p>
                                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                        <Truck className="w-4 h-4 mr-1" />
                                        Planifier livraison
                                    </Button>
                                </div>
                                <Truck className="w-12 h-12 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                        <CardContent className="px-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-green-900 mb-2">Aujourd'hui</h3>
                                    <p className="text-sm text-green-700 mb-4">
                                        {orders.filter((o) => new Date(o.deliveryDate).toDateString() === new Date().toDateString()).length}{" "}
                                        livraisons prévues
                                    </p>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        Voir planning
                                    </Button>
                                </div>
                                <Calendar className="w-12 h-12 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filtres et recherche */}
                <Card className="border-0 shadow-sm mb-6">
                    <CardContent className="px-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                            {/* Recherche */}
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="search"
                                        placeholder="Rechercher par numéro, client, email..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 h-11 rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Filtres */}
                            <div className="flex items-center space-x-3">
                                <Select value={dateFilter} onValueChange={setDateFilter}>
                                    <SelectTrigger className="w-40">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <SelectValue placeholder="Période" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Toutes les dates</SelectItem>
                                        <SelectItem value="today">Aujourd'hui</SelectItem>
                                        <SelectItem value="week">Cette semaine</SelectItem>
                                        <SelectItem value="month">Ce mois</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-48">
                                        <ArrowUpDown className="w-4 h-4 mr-2" />
                                        <SelectValue placeholder="Trier par" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="date_desc">Date (plus récent)</SelectItem>
                                        <SelectItem value="date_asc">Date (plus ancien)</SelectItem>
                                        <SelectItem value="amount_desc">Montant (décroissant)</SelectItem>
                                        <SelectItem value="amount_asc">Montant (croissant)</SelectItem>
                                        <SelectItem value="customer">Client (A-Z)</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="outline" size="sm">
                                    <RefreshCw className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Actions en lot */}
                        {selectedOrders.length > 0 && (
                            <div className="mt-4 p-4 bg-[var(--farm-green)]/5 rounded-lg border border-[var(--farm-green)]/20">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-[var(--farm-green-dark)]">
                                        {selectedOrders.length} commande(s) sélectionnée(s)
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm">
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Accepter tout
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Clock className="w-4 h-4 mr-1" />
                                            Marquer en préparation
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Mail className="w-4 h-4 mr-1" />
                                            Notifier clients
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Printer className="w-4 h-4 mr-1" />
                                            Imprimer étiquettes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Onglets et liste des commandes */}
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-0">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <div className="px-6 pt-6">
                                <TabsList className="grid w-full grid-cols-7 bg-[var(--farm-beige)]/50 p-1 rounded-xl border border-[var(--farm-beige-dark)]/20">
                                    <TabsTrigger
                                        value="toutes"
                                        className="data-[state=active]:bg-white data-[state=active]:text-[var(--farm-green-dark)] data-[state=active]:shadow-sm rounded-lg transition-all duration-200 font-medium"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Package className="w-4 h-4" />
                                            <span>Toutes</span>
                                            <Badge className="bg-gray-100 text-gray-800 text-xs border-0">{orders.length}</Badge>
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="nouvelles"
                                        className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg transition-all duration-200 font-medium"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <span>Nouvelles</span>
                                            <Badge className="bg-blue-100 text-blue-800 text-xs border-0">{getOrderCount("nouvelle")}</Badge>
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="preparation"
                                        className="data-[state=active]:bg-white data-[state=active]:text-orange-700 data-[state=active]:shadow-sm rounded-lg transition-all duration-200 font-medium"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                            <span>Préparation</span>
                                            <Badge className="bg-orange-100 text-orange-800 text-xs border-0">
                                                {getOrderCount("preparation")}
                                            </Badge>
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="pretes"
                                        className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm rounded-lg transition-all duration-200 font-medium"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                            <span>Prêtes</span>
                                            <Badge className="bg-purple-100 text-purple-800 text-xs border-0">{getOrderCount("prete")}</Badge>
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="livraison"
                                        className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm rounded-lg transition-all duration-200 font-medium"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                            <span>Livraison</span>
                                            <Badge className="bg-indigo-100 text-indigo-800 text-xs border-0">
                                                {getOrderCount("livraison")}
                                            </Badge>
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="livrees"
                                        className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-lg transition-all duration-200 font-medium"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <span>Livrées</span>
                                            <Badge className="bg-green-100 text-green-800 text-xs border-0">{getOrderCount("livree")}</Badge>
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="annulees"
                                        className="data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-sm rounded-lg transition-all duration-200 font-medium"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <span>Annulées</span>
                                            <Badge className="bg-red-100 text-red-800 text-xs border-0">{getOrderCount("annulee")}</Badge>
                                        </div>
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value={activeTab} className="mt-0">
                                <div className="p-6">
                                    {/* Header du tableau */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4">
                                            <Checkbox
                                                checked={selectedOrders.length === getFilteredOrders().length && getFilteredOrders().length > 0}
                                                onCheckedChange={handleSelectAll}
                                            />
                                            <span className="text-sm text-gray-600">{getFilteredOrders().length} commande(s)</span>
                                        </div>
                                    </div>

                                    {/* Liste des commandes */}
                                    <div className="space-y-4">
                                        {getFilteredOrders().map((order) => (
                                            <div
                                                key={order.id}
                                                className={`bg-white rounded-lg border transition-all duration-200 hover:shadow-md ${selectedOrders.includes(order.id) ? "border-[var(--farm-green)] shadow-sm" : "border-gray-200"
                                                    }`}
                                            >
                                                <div className="p-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <Checkbox
                                                                checked={selectedOrders.includes(order.id)}
                                                                onCheckedChange={() => handleSelectOrder(order.id)}
                                                            />

                                                            {/* Informations principales */}
                                                            <div className="flex items-center space-x-4">
                                                                <Avatar className="h-12 w-12">
                                                                    <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                                                                    <AvatarFallback className="bg-[var(--farm-green)] text-white font-semibold">
                                                                        {order.customer.avatar}
                                                                    </AvatarFallback>
                                                                </Avatar>

                                                                <div>
                                                                    <div className="flex items-center space-x-3 mb-1">
                                                                        <h3 className="font-semibold text-[var(--farm-green-dark)]">Commande #{order.number}</h3>
                                                                        {getStatusBadge(order.status)}
                                                                        {getPaymentBadge(order.paymentStatus)}
                                                                    </div>
                                                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                                        <span className="flex items-center">
                                                                            <User className="w-4 h-4 mr-1" />
                                                                            {order.customer.name}
                                                                        </span>
                                                                        <span className="flex items-center">
                                                                            <Calendar className="w-4 h-4 mr-1" />
                                                                            {formatDate(order.date)}
                                                                        </span>
                                                                        <span className="flex items-center">
                                                                            <ShoppingBag className="w-4 h-4 mr-1" />
                                                                            {order.items} article(s)
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Montant et actions */}
                                                        <div className="flex items-center space-x-4">
                                                            <div className="text-right">
                                                                <p className="text-2xl font-bold text-[var(--farm-green-dark)]">{order.amount.toFixed(2)} €</p>
                                                                <p className="text-sm text-gray-600">
                                                                    {order.deliveryType === "livraison" ? "Livraison" : "Retrait"}
                                                                </p>
                                                            </div>

                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="sm">
                                                                        <MoreHorizontal className="w-4 h-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="w-48">
                                                                    <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                                                                        <Eye className="w-4 h-4 mr-2" />
                                                                        Voir les détails
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Edit className="w-4 h-4 mr-2" />
                                                                        Modifier
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Printer className="w-4 h-4 mr-2" />
                                                                        Imprimer
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Mail className="w-4 h-4 mr-2" />
                                                                        Envoyer par email
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem>
                                                                        <Phone className="w-4 h-4 mr-2" />
                                                                        Appeler le client
                                                                    </DropdownMenuItem>
                                                                    {order.status !== "annulee" && (
                                                                        <>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem className="text-red-600">
                                                                                <XCircle className="w-4 h-4 mr-2" />
                                                                                Annuler la commande
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </div>

                                                    {/* Informations de livraison */}
                                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                                                                <span className="flex items-center">
                                                                    <MapPin className="w-4 h-4 mr-1" />
                                                                    {order.deliveryAddress}
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <Clock className="w-4 h-4 mr-1" />
                                                                    Livraison prévue: {formatDate(order.deliveryDate)}
                                                                </span>
                                                            </div>

                                                            {order.status === "nouvelle" && (
                                                                <Button size="sm" className="bg-[var(--farm-green)] hover:bg-[var(--farm-green-dark)]">
                                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                                    Accepter
                                                                </Button>
                                                            )}
                                                            {order.status === "preparation" && (
                                                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                                                    <Package className="w-4 h-4 mr-1" />
                                                                    Marquer prête
                                                                </Button>
                                                            )}
                                                            {order.status === "prete" && (
                                                                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                                                                    <Truck className="w-4 h-4 mr-1" />
                                                                    Expédier
                                                                </Button>
                                                            )}
                                                        </div>

                                                        {order.notes && (
                                                            <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                                                                <p className="text-sm text-yellow-800">
                                                                    <AlertCircle className="w-4 h-4 inline mr-1" />
                                                                    Note: {order.notes}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {getFilteredOrders().length === 0 && (
                                        <div className="text-center py-12">
                                            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande trouvée</h3>
                                            <p className="text-gray-500">
                                                {searchQuery
                                                    ? `Aucune commande ne correspond à "${searchQuery}".`
                                                    : activeTab === "toutes"
                                                        ? "Vous n'avez pas encore reçu de commandes."
                                                        : `Aucune commande dans la catégorie "${activeTab}".`}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>


            {/* Aide contextuelle */}
            <Card className="border-0 shadow-sm bg-[var(--farm-beige)]/30 mt-8">
                <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--farm-green)]/10 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-5 h-5 text-[var(--farm-green)]" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-[var(--farm-green-dark)] mb-2">Comment gérer vos commandes ?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <p className="mb-2">
                                        <strong>1. Nouvelles commandes :</strong> Acceptez ou refusez les commandes reçues
                                    </p>
                                    <p className="mb-2">
                                        <strong>2. Préparation :</strong> Préparez les produits commandés
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-2">
                                        <strong>3. Livraison :</strong> Organisez vos tournées de livraison
                                    </p>
                                    <p className="mb-2">
                                        <strong>4. Suivi :</strong> Communiquez avec vos clients sur l'avancement
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Modal de détail de commande */}
            <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    {selectedOrder && (
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="flex items-center space-x-3">
                                    <span>Commande #{selectedOrder.number}</span>
                                    {getStatusBadge(selectedOrder.status)}
                                    {getPaymentBadge(selectedOrder.paymentStatus)}
                                </DialogTitle>
                                <DialogDescription>
                                    Passée le {formatDate(selectedOrder.date)} par {selectedOrder.customer.name}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Informations client */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center">
                                            <User className="w-5 h-5 mr-2" />
                                            Informations client
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-12 w-12">
                                                <AvatarFallback className="bg-[var(--farm-green)] text-white font-semibold">
                                                    {selectedOrder.customer.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{selectedOrder.customer.name}</p>
                                                <p className="text-sm text-gray-600">{selectedOrder.customer.email}</p>
                                                <p className="text-sm text-gray-600">{selectedOrder.customer.phone}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Informations de livraison */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center">
                                            <Truck className="w-5 h-5 mr-2" />
                                            Livraison
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div>
                                            <p className="font-medium">
                                                Type: {selectedOrder.deliveryType === "livraison" ? "Livraison à domicile" : "Retrait en ferme"}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">{selectedOrder.deliveryAddress}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Date prévue</p>
                                            <p className="text-sm text-gray-600">{formatDate(selectedOrder.deliveryDate)}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Produits commandés */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center">
                                        <ShoppingBag className="w-5 h-5 mr-2" />
                                        Produits commandés
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {selectedOrder.products.map((product: any, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                                            >
                                                <div className="flex-1">
                                                    <p className="font-medium">{product.name}</p>
                                                    <p className="text-sm text-gray-600">Quantité: {product.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">{(product.price * product.quantity).toFixed(2)} €</p>
                                                    <p className="text-sm text-gray-600">{product.price.toFixed(2)} € / unité</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">Total</span>
                                        <span className="text-2xl font-bold text-[var(--farm-green-dark)]">{selectedOrder.amount.toFixed(2)} €</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Notes */}
                            {selectedOrder.notes && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center">
                                            <FileText className="w-5 h-5 mr-2" />
                                            Notes
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700">{selectedOrder.notes}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Actions */}
                            <div className="flex justify-end space-x-3 pt-4 border-t">
                                <Button variant="outline">
                                    <Printer className="w-4 h-4 mr-2" />
                                    Imprimer
                                </Button>
                                <Button variant="outline">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Envoyer par email
                                </Button>
                                <Button className="bg-[var(--farm-green)] hover:bg-[var(--farm-green-dark)]">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Modifier la commande
                                </Button>
                            </div>
                        </DialogContent>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
