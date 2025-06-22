import Link from "next/link"
import {
    Package,
    ShoppingBasket,
    Users,
    Calendar,
    Leaf,
    Euro,
    PackageOpen,
    Megaphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import WeatherWidget from "@/app-components/WeatherWidget"
import FarmProducts from "./FarmProducts"

export default function FarmerHomepage() {

    // Données des statistiques
    const stats = [
        {
            title: "Chiffre d'affaires",
            value: "€0",
            change: "Aucune donnée",
            period: "Ce mois",
            icon: Euro,
            bgColor: "bg-farm-green-dark",
        },
        {
            title: "Commandes",
            value: "0",
            change: "Aucune donnée",
            period: "Cette semaine",
            icon: ShoppingBasket,
            bgColor: "bg-farm-orange",
        },
        {
            title: "Produits actifs",
            value: "0",
            change: "Aucune donnée",
            period: "En stock",
            icon: Package,
            bgColor: "bg-farm-green-dark",
        },
        {
            title: "Clients fidèles",
            value: "0",
            change: "Aucune donnée",
            period: "Actifs ce mois",
            icon: Users,
            bgColor: "bg-farm-orange",
        },
    ]

    const recentOrders = [
        {
            id: "CMD-2305",
            customer: "Marie Dupont",
            date: "Aujourd'hui, 10:30",
            amount: "86,50 €",
            status: "En préparation",
            statusColor: "bg-amber-500",
        },
        {
            id: "CMD-2304",
            customer: "Thomas Martin",
            date: "Aujourd'hui, 09:15",
            amount: "42,20 €",
            status: "Prêt à livrer",
            statusColor: "bg-blue-500",
        },
        {
            id: "CMD-2303",
            customer: "Sophie Bernard",
            date: "Hier, 16:45",
            amount: "124,90 €",
            status: "Livré",
            statusColor: "bg-green-500",
        },
        {
            id: "CMD-2302",
            customer: "Lucas Petit",
            date: "Hier, 14:20",
            amount: "56,75 €",
            status: "Livré",
            statusColor: "bg-green-500",
        },
        {
            id: "CMD-2301",
            customer: "Emma Leroy",
            date: "22/05/2023",
            amount: "93,30 €",
            status: "Livré",
            statusColor: "bg-green-500",
        },
    ]

    const upcomingDeliveries = [
        {
            date: "24 mai",
            location: "Marché central",
            orders: "12 commandes",
            time: "08:00 - 12:00",
        },
        {
            date: "26 mai",
            location: "Livraisons à domicile",
            orders: "8 commandes",
            time: "14:00 - 18:00",
        },
        {
            date: "28 mai",
            location: "Marché bio",
            orders: "15 commandes",
            time: "09:00 - 13:00",
        },
    ]

    const getStockBadge = (product: any) => {
        if (product.status === "rupture") {
            return <Badge className="bg-red-100 text-red-800 border-red-200">Rupture</Badge>
        } else if (product.status === "stock_faible") {
            return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Stock faible</Badge>
        } else {
            return <Badge className="bg-green-100 text-green-800 border-green-200">Disponible</Badge>
        }
    }

    return (
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-farm-beige-light">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className={`${stat.bgColor} w-10 h-10 rounded-full flex items-center justify-center`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-green-50 px-2 py-0.5 rounded-full">
                                <span className="text-green-600 text-xs font-medium">{stat.change}</span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-gray-600 text-sm mt-0.5">{stat.title}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{stat.period}</p>
                        </div>
                    </div>
                ))}
            </div>

            <WeatherWidget />

            {/* Section Produits de la ferme */}
            <FarmProducts />

            {/* Commandes récentes et produits populaires */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Commandes récentes */}
                <Card className="border-0 shadow-md lg:col-span-2">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-farm-green-dark">Commandes récentes</CardTitle>
                            <Button variant="ghost" size="sm" className="hidden text-farm-green hover:text-farm-green-dark">
                                Voir tout
                            </Button>
                        </div>
                        <CardDescription>Suivez vos dernières commandes et leur statut</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <th className="px-4 py-3">ID</th>
                                        <th className="px-4 py-3">Client</th>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Montant</th>
                                        <th className="px-4 py-3">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {/* Aucune commande pour le moment */}
                                    <tr>
                                        <td colSpan={5}>
                                            <div className="px-6 py-8 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-4">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-[var(--farm-green-dark)] rounded-full animate-pulse"></div>
                                                        <div className="relative bg-farm-beige-light rounded-full p-4">
                                                            <PackageOpen className="w-16 h-16 text-gray-500" />
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 font-medium text-lg">
                                                        Aucune commande pour le moment
                                                    </p>
                                                    <p className="text-gray-400 text-sm">
                                                        Les nouvelles commandes apparaîtront ici
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* {recentOrders.map((order, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{order.customer}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.amount}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className="inline-flex items-center">
                                                    <span
                                                        className={`w-2 h-2 rounded-full mr-1.5 ${order.statusColor}`}
                                                        aria-hidden="true"
                                                    ></span>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))} */}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Prochaines livraisons */}
                <Card className="border-0 shadow-md">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-farm-green-dark">Prochaines livraisons</CardTitle>
                            <Button variant="ghost" size="sm" className="hidden text-farm-green hover:text-farm-green-dark">
                                Calendrier
                            </Button>
                        </div>
                        <CardDescription>Planning des prochains jours</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Aucune livraison pour le moment */}
                            <div className="px-6 py-8 text-center">
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-[var(--farm-green-dark)] rounded-full animate-pulse"></div>
                                        <div className="relative bg-farm-beige-light rounded-full p-4">
                                            <PackageOpen className="w-20 h-20 text-gray-500" />
                                        </div>
                                    </div>
                                    <p className="text-gray-500 font-medium text-lg">
                                        Aucune livraison pour le moment
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        Les nouvelles livraisons apparaîtront ici
                                    </p>
                                </div>
                            </div>

                            {/* {upcomingDeliveries.map((delivery, index) => (
                                <div key={index} className="flex items-start p-3 rounded-lg bg-farm-beige">
                                    <div className="w-12 h-12 rounded-lg bg-farm-green-dark flex flex-col items-center justify-center text-white mr-4">
                                        <span className="text-xs">MAI</span>
                                        <span className="text-lg font-bold">{delivery.date.split(" ")[0]}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-farm-green-dark">{delivery.location}</h4>
                                        <div className="flex items-center text-sm text-gray-600 mt-1">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {delivery.time}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 mt-1">
                                            <Package className="w-4 h-4 mr-1" />
                                            {delivery.orders}
                                        </div>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Conseils et astuces */}
            <Card className="border-0 shadow-md bg-gradient-to-r from-[#5a7052] to-[#3c5a3e] text-white">
                <CardContent className="p-6">
                    <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                            <Megaphone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">Conseil du jour</h3>
                            <p className="mb-4">
                                Pensez à mettre à jour vos disponibilités pour les marchés du week-end. Les clients recherchent
                                activement des produits frais pour leurs repas dominicaux !
                            </p>
                            <Button variant="secondary" className="bg-white text-farm-green-dark hover:bg-white/90">
                                Mettre à jour mes disponibilités
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
