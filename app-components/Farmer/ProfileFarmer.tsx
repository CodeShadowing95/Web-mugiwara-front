"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  User,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Edit,
  Save,
  X,
  Check,
  Bell,
  Shield,
  Award,
  Calendar,
  TrendingUp,
  Users,
  Package,
  Star,
  Leaf,
  Upload,
  ChevronDown,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from '@/app/UserContext';

export default function FermierProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [hasFarms, setHasFarms] = useState(false)
  const userContext = useUser()
  
  if (!userContext) {
      return <div>Erreur : Contexte utilisateur non disponible</div>
  }

  const { currentUser } = userContext;

  const userInitials = currentUser?.persona.firstName.charAt(0) + currentUser?.persona.lastName.charAt(0).toUpperCase();

  // Données du profil
  const [profileData, setProfileData] = useState({
    // Informations personnelles
    firstName: "Pierre",
    lastName: "Durand",
    email: "pierre.durand@ferme-oliviers.fr",
    phone: "06 12 34 56 78",
    avatar: "/placeholder.svg?height=120&width=120&text=PD",

    // Informations ferme
    farmName: "Ferme des Oliviers",
    farmDescription:
      "Exploitation familiale depuis 3 générations, spécialisée dans l'agriculture biologique. Nous cultivons des légumes de saison et élevons des poules pondeuses en plein air.",
    address: "123 Chemin des Oliviers",
    city: "Aix-en-Provence",
    postalCode: "13100",
    region: "Provence-Alpes-Côte d'Azur",
    website: "https://www.ferme-oliviers.fr",
    farmSize: "15 hectares",
    foundedYear: "1987",

    // Certifications
    certifications: ["Agriculture Biologique (AB)", "Haute Valeur Environnementale (HVE)"],

    // Préférences
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false,
    },
    language: "fr",
    timezone: "Europe/Paris",
  })

  const [stats] = useState({
    totalSales: "0 €",
    totalOrders: 0,
    averageRating: 0,
    totalCustomers: 0,
    joinDate: "Mars 2022",
    productsListed: 0,
  })

  const [userFarms] = useState([
    {
      id: 1,
      name: "Ferme des Oliviers",
      location: "Aix-en-Provence, Provence",
      type: "Bio & Légumes",
      isActive: true,
      avatar: "FO",
      color: "bg-farm-green",
      description: "Exploitation familiale depuis 3 générations, spécialisée dans l'agriculture biologique.",
      products: 28,
      customers: 156,
    },
    {
      id: 2,
      name: "Les Jardins de Marie",
      location: "Tours, Loire",
      type: "Fruits & Légumes",
      isActive: false,
      avatar: "JM",
      color: "bg-farm-orange",
      description: "Ferme spécialisée dans les fruits de saison et légumes primeurs.",
      products: 15,
      customers: 89,
    },
    {
      id: 3,
      name: "Élevage du Soleil",
      location: "Caen, Normandie",
      type: "Produits laitiers",
      isActive: false,
      avatar: "ES",
      color: "bg-blue-600",
      description: "Élevage de vaches laitières et production de fromages fermiers.",
      products: 12,
      customers: 67,
    },
  ])

  const activeFarm = userFarms.find((farm) => farm.isActive) || userFarms[0]

  const handleFarmChange = (farmId: number) => {
    // Logique pour changer de ferme active
    console.log("Changement vers la ferme:", farmId)
  }

  const handleInputChange = (field: string, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value },
    }))
  }

  const handleSave = () => {
    // Simulation de sauvegarde
    setIsEditing(false)
    // Ici, vous feriez un appel API pour sauvegarder les données
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const data = localStorage.getItem("farms")
        if (data) {
          const farms = JSON.parse(data)
          if (Object.keys(farms).length > 0) {
            setHasFarms(true)

            // Optionnel : supprimer la donnée après affichage
            // localStorage.removeItem("newFarmData")
          }
        }
      } catch (error) {
        console.error("Erreur de lecture de localStorage newFarmData", error)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-farm-beige-light">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête du profil */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-[var(--farm-green)] to-[var(--farm-green-dark)] text-white p-0">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage src={profileData.avatar || "/cook.jpg"} alt={profileData.firstName} />
                    <AvatarFallback className="bg-farm-orange text-white text-4xl font-bold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                    <Camera className="w-4 h-4 text-farm-green-dark" />
                  </button>
                </div>

                {/* Informations principales */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">
                    {currentUser?.persona.firstName} {currentUser?.persona.lastName}
                  </h1>

                  {!hasFarms ? (
                    <p className="text-lg text-white/70 mb-3">
                      Aucune ferme n'est encore associée à ce compte.
                    </p>
                  ) : (
                    /* Dropdown de sélection de ferme */
                    <div className="mb-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center space-x-3 hover:bg-white/10 p-2 rounded-lg transition-all duration-200 group">
                            <Avatar className="h-8 w-8 border-2 border-white/50">
                              <AvatarFallback className={`${activeFarm.color} text-white font-semibold text-sm`}>
                                {activeFarm.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                              <p className="text-xl font-semibold text-white group-hover:text-white/90 transition-colors">
                                {activeFarm.name}
                              </p>
                              <p className="text-sm text-white/70">{activeFarm.type}</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-96 p-2" align="start">
                          <DropdownMenuLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
                            Mes fermes
                          </DropdownMenuLabel>

                          {userFarms.map((farm) => (
                            <DropdownMenuItem
                              key={farm.id}
                              onClick={() => handleFarmChange(farm.id)}
                              className={`flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-colors ${
                                farm.isActive ? "bg-farm-green/10 border border-farm-green/20" : "hover:bg-gray-50"
                              }`}
                            >
                              <Avatar className="h-12 w-12 mt-1">
                                <AvatarFallback className={`${farm.color} text-white font-semibold`}>
                                  {farm.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <p className="font-semibold text-gray-900 text-sm truncate">{farm.name}</p>
                                  {farm.isActive && (
                                    <Badge className="bg-farm-green text-white text-xs border-0">Actuelle</Badge>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mb-1">{farm.location}</p>
                                <p className="text-xs text-gray-400 mb-2">{farm.type}</p>
                                <p className="text-xs text-gray-600 line-clamp-2">{farm.description}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className="text-xs text-gray-500">{farm.products} produits</span>
                                  <span className="text-xs text-gray-500">{farm.customers} clients</span>
                                </div>
                              </div>
                              {!farm.isActive && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-farm-green hover:text-farm-green-dark hover:bg-farm-green/10 text-xs mt-1"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleFarmChange(farm.id)
                                  }}
                                >
                                  Sélectionner
                                </Button>
                              )}
                            </DropdownMenuItem>
                          ))}

                          <DropdownMenuSeparator className="my-2" />

                          <div className="px-3 py-3 mt-2 bg-farm-beige/50 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1 flex items-center">
                              <Leaf className="w-3 h-3 mr-1" />
                              Astuce
                            </p>
                            <p className="text-xs text-gray-500">
                              Basculez facilement entre vos fermes pour gérer chacune d'elles séparément.
                            </p>
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-white/80">
                    <div className={`flex items-center ${!hasFarms && 'hidden'}`}>
                      <MapPin className="w-4 h-4 mr-1" />
                      {activeFarm.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Membre depuis {new Date().getFullYear()}
                    </div>
                    <div className={`flex items-center ${!hasFarms && 'hidden'}`}>
                      <Star className="w-4 h-4 mr-1" />
                      {stats.averageRating}/5 ({stats.totalOrders} avis)
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleSave}
                        className="bg-white text-farm-green-dark hover:bg-gray-100"
                        size="sm"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-white text-white hover:bg-white/10"
                        size="sm"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-white text-farm-green-dark hover:bg-gray-100"
                      size="sm"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier le profil
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques rapides */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 ${!hasFarms && 'hidden'}`}>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-farm-green mx-auto mb-2" />
              <p className="text-2xl font-bold text-farm-green-dark">{stats.totalSales}</p>
              <p className="text-sm text-gray-600">Ventes totales</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 text-farm-orange mx-auto mb-2" />
              <p className="text-2xl font-bold text-farm-green-dark">{stats.totalOrders}</p>
              <p className="text-sm text-gray-600">Commandes</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-farm-green-dark">{stats.totalCustomers}</p>
              <p className="text-sm text-gray-600">Clients</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-farm-green-dark">{stats.averageRating}/5</p>
              <p className="text-sm text-gray-600">Note moyenne</p>
            </CardContent>
          </Card>
        </div>

        {/* Onglets du profil */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full grid-cols-2 ${hasFarms ? 'md:grid-cols-5' : 'md:grid-cols-3'} bg-white border border-gray-200 p-1 rounded-xl`}>
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-[var(--farm-green)] data-[state=active]:text-white rounded-lg"
            >
              <User className="w-4 h-4 mr-2" />
              Personnel
            </TabsTrigger>
            <TabsTrigger
              value="farm"
              className={`data-[state=active]:bg-[var(--farm-green)] data-[state=active]:text-white rounded-lg ${!hasFarms && 'hidden'}`}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Ferme
            </TabsTrigger>
            <TabsTrigger
              value="certifications"
              className={`data-[state=active]:bg-[var(--farm-green)] data-[state=active]:text-white rounded-lg ${!hasFarms && 'hidden'}`}
            >
              <Award className="w-4 h-4 mr-2" />
              Certifications
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-[var(--farm-green)] data-[state=active]:text-white rounded-lg"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-[var(--farm-green)] data-[state=active]:text-white rounded-lg"
            >
              <Shield className="w-4 h-4 mr-2" />
              Sécurité
            </TabsTrigger>
          </TabsList>

          {/* Onglet Informations personnelles */}
          <TabsContent value="personal">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-farm-green-dark">Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-base font-medium text-farm-green-dark">
                      Prénom
                    </Label>
                    <Input
                      id="firstName"
                      value={currentUser?.persona.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-base font-medium text-farm-green-dark">
                      Nom
                    </Label>
                    <Input
                      id="lastName"
                      value={currentUser?.persona.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 h-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-medium text-farm-green-dark">
                    Email
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={currentUser?.persona.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-medium text-farm-green-dark">
                    Téléphone
                  </Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={currentUser?.persona.phoneNumber}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="language" className="text-base font-medium text-farm-green-dark">
                      Langue
                    </Label>
                    <Select
                      value={profileData.language}
                      onValueChange={(value) => handleInputChange("language", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="mt-2 h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone" className="text-base font-medium text-farm-green-dark">
                      Fuseau horaire
                    </Label>
                    <Select
                      value={profileData.timezone}
                      onValueChange={(value) => handleInputChange("timezone", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="mt-2 h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (UTC+0)</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Informations ferme */}
          <TabsContent value="farm">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-farm-green-dark">Informations de la ferme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium text-farm-green-dark">Ferme sélectionnée</Label>
                  <div className="mt-2 p-4 bg-farm-beige/30 rounded-lg border border-farm-beige-dark/20">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={`${activeFarm.color} text-white font-semibold`}>
                          {activeFarm.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-farm-green-dark">{activeFarm.name}</p>
                        <p className="text-sm text-gray-600">
                          {activeFarm.type} • {activeFarm.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Pour modifier ces informations ou changer de ferme, utilisez le sélecteur en haut de page.
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="farmDescription" className="text-base font-medium text-farm-green-dark">
                    Description
                  </Label>
                  <Textarea
                    id="farmDescription"
                    value={profileData.farmDescription}
                    onChange={(e) => handleInputChange("farmDescription", e.target.value)}
                    disabled={!isEditing}
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-base font-medium text-farm-green-dark">
                    Adresse
                  </Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    disabled={!isEditing}
                    className="mt-2 h-12"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="city" className="text-base font-medium text-farm-green-dark">
                      Ville
                    </Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-base font-medium text-farm-green-dark">
                      Code postal
                    </Label>
                    <Input
                      id="postalCode"
                      value={profileData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="region" className="text-base font-medium text-farm-green-dark">
                      Région
                    </Label>
                    <Input
                      id="region"
                      value={profileData.region}
                      onChange={(e) => handleInputChange("region", e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="website" className="text-base font-medium text-farm-green-dark">
                      Site web
                    </Label>
                    <div className="relative mt-2">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="website"
                        type="url"
                        value={profileData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="farmSize" className="text-base font-medium text-farm-green-dark">
                      Taille de l'exploitation
                    </Label>
                    <Input
                      id="farmSize"
                      value={profileData.farmSize}
                      onChange={(e) => handleInputChange("farmSize", e.target.value)}
                      disabled={!isEditing}
                      className="mt-2 h-12"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Certifications */}
          <TabsContent value="certifications">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-farm-green-dark">Certifications et labels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  {profileData.certifications.map((cert, index) => (
                    <Badge
                      key={index}
                      className="bg-farm-green text-white px-4 py-2 text-sm flex items-center space-x-2"
                    >
                      <Award className="w-4 h-4" />
                      <span>{cert}</span>
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newCerts = profileData.certifications.filter((_, i) => i !== index)
                            handleInputChange("certifications", newCerts)
                          }}
                          className="ml-2 hover:text-red-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>

                {isEditing && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Ajouter une nouvelle certification</p>
                    <Button variant="outline" size="sm">
                      Télécharger un certificat
                    </Button>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Pourquoi ajouter des certifications ?</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Augmente la confiance des clients</li>
                    <li>• Améliore votre visibilité dans les recherches</li>
                    <li>• Justifie des prix premium</li>
                    <li>• Différencie vos produits</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Notifications */}
          <TabsContent value="notifications">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-farm-green-dark">Préférences de notification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Notifications par email</h3>
                      <p className="text-sm text-gray-600">Recevez les notifications importantes par email</p>
                    </div>
                    <Switch
                      checked={profileData.notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Notifications SMS</h3>
                      <p className="text-sm text-gray-600">Recevez les alertes urgentes par SMS</p>
                    </div>
                    <Switch
                      checked={profileData.notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Notifications push</h3>
                      <p className="text-sm text-gray-600">Recevez les notifications dans votre navigateur</p>
                    </div>
                    <Switch
                      checked={profileData.notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Communications marketing</h3>
                      <p className="text-sm text-gray-600">Recevez nos conseils et actualités</p>
                    </div>
                    <Switch
                      checked={profileData.notifications.marketing}
                      onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Sécurité */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-farm-green-dark">Sécurité du compte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-green-900">Email vérifié</h3>
                        <p className="text-sm text-green-700">Votre adresse email a été vérifiée</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Mot de passe</h3>
                      <p className="text-sm text-gray-600">Dernière modification il y a 3 mois</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Authentification à deux facteurs</h3>
                      <p className="text-sm text-gray-600">Sécurisez votre compte avec 2FA</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
