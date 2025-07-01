"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
    ArrowLeft,
    Upload,
    MapPin,
    Phone,
    Mail,
    Globe,
    Leaf,
    Tractor,
    Users,
    Package,
    Camera,
    X,
    Check,
    AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFarm2 } from "@/app/FarmContext2"
import { diceBearAvatars } from "@/constants"

export default function AddFarmPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [uploadedImages, setUploadedImages] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const { refreshNewFarm, setFarms, setSelectedFarm } = useFarm2()

    // États du formulaire
    const [formData, setFormData] = useState({
        // Informations générales
        avatar: "",
        name: "",
        description: "",
        farmTypes: [] as string[],
        // certifications: [] as string[],

        // Localisation
        address: "",
        city: "",
        zipCode: "",
        region: "",
        coordinates: { lat: "", lng: "" },

        // Contact
        phone: "",
        email: "",
        website: "",

        // Détails de production
        farmSize: "",
        // productionMethods: [] as string[],
        mainProducts: [] as string[],
        seasonality: "",

        // Logistique
        deliveryZones: [] as string[],
        deliveryMethods: [] as string[],
        minimumOrder: "",

        // Images
        profileImage: "",
        galleryImages: [] as string[],
    })

    const steps = [
        { id: 1, title: "Informations générales", icon: Leaf },
        { id: 2, title: "Localisation", icon: MapPin },
        { id: 3, title: "Contact", icon: Phone },
        { id: 4, title: "Production", icon: Tractor },
        { id: 5, title: "Logistique", icon: Package },
        { id: 6, title: "Images", icon: Camera },
    ]

    const farmTypes = [
        { id: 1, name: "Maraîchage" },                 // légumes
        { id: 2, name: "Arboriculture" },              // fruits
        { id: 3, name: "Élevage bovin" },
        { id: 4, name: "Élevage ovin/caprin" },
        { id: 5, name: "Élevage porcin" },
        { id: 6, name: "Aviculture" },                 // poules, canards...
        { id: 7, name: "Apiculture" },                 // abeilles/miel
        { id: 8, name: "Céréaliculture" },
        { id: 9, name: "Viticulture" },
        { id: 10, name: "Horticulture" },              // fleurs, ornement
        { id: 11, name: "Polyculture-élevage" },       // mixte
        { id: 12, name: "Agroforesterie" },
        { id: 13, name: "Permaculture" },
        { id: 14, name: "Aquaculture" },
        { id: 15, name: "Transformation artisanale" }, // confitures, yaourts...
        { id: 16, name: "Agriculture biologique" },
        { id: 17, name: "Agriculture urbaine" },
        { id: 18, name: "Ferme pédagogique" },
    ]

    const certifications = [
        "Agriculture Biologique (AB)",
        "Demeter",
        "Nature & Progrès",
        "Haute Valeur Environnementale (HVE)",
        "Label Rouge",
        "AOP/AOC",
        "IGP",
        "Rainforest Alliance",
        "Fair Trade",
        "Autre",
    ]

    const productionMethods = [
        "Culture en plein champ",
        "Culture sous serre",
        "Hydroponie",
        "Aquaponie",
        "Culture verticale",
        "Élevage en plein air",
        "Élevage en bâtiment",
        "Transformation artisanale",
    ]

    const deliveryMethods = [
        "Livraison à domicile",
        "Point de retrait",
        "Marché local",
        "Vente à la ferme",
        "AMAP",
        "Magasins partenaires",
    ]

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleArrayToggle = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: Array.isArray(prev[field as keyof typeof prev]) && (prev[field as keyof typeof prev] as string[]).includes(value)
                ? (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value)
                : [...(prev[field as keyof typeof prev] as string[]), value],
        }))
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]

            const newImages = Array.from(files)
                .filter(file => {
                    const extension = "." + file.name.split(".").pop()?.toLowerCase()
                    return allowedExtensions.includes(extension)
                })
                .map(file => {
                    // En production, on utiliserait une URL signée du serveur
                    // Pour la simulation, on utilise le nom réel du fichier
                    return `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(file.name)}`
                })

            if (newImages.length > 0) {
                setUploadedImages((prev) => [...prev, ...newImages])
            } else {
                // Optionnel : Afficher un message d'erreur si aucune image valide n'a été sélectionnée
                console.warn("Aucune image valide sélectionnée. Extensions autorisées : ", allowedExtensions.join(", "))
            }
        }
    }

    const removeImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async () => {
        setIsLoading(true)

        // Définir l'avatar
        const avatarName = diceBearAvatars[Math.floor(Math.random() * diceBearAvatars.length)]
        formData.avatar = `https://api.dicebear.com/9.x/shapes/svg?seed=${avatarName}`
        
        console.log("Formulaire soumis :", formData);

        // Envoi des données au serveur
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const token = localStorage.getItem("jwt_token");
        console.log("API URL:", apiUrl);
        console.log("Token:", token);

        try {
            const response = await fetch(`${apiUrl}/api/v1/create-farm`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                console.log("Status:", response.status)
                const text = await response.text()
                console.log("Response:", text)

                setIsLoading(false)
                if (response.status === 401) {
                    setError("Identifiants invalides.")
                } else {
                    setError("Erreur interne du serveur.")
                }
                return
            }

            const data = await response.json()
            console.log("Réponse de l'API :", data)
            // Récupération des fermes existantes du localStorage
            const existingFarmsStr = localStorage.getItem('farms')
            const existingFarms = existingFarmsStr ? JSON.parse(existingFarmsStr) : []

            // Ajout de la nouvelle ferme
            const updatedFarms = [...existingFarms, data]

            // Mise à jour du localStorage et du contexte
            localStorage.setItem('farms', JSON.stringify(updatedFarms))
            setFarms(updatedFarms)
            setSelectedFarm(data)
            refreshNewFarm()
            // Réinitialisation du formulaire
            setFormData({
                avatar: "",
                name: "",
                description: "",
                farmTypes: [],
                // certifications: [],

                address: "",
                city: "",
                zipCode: "",
                region: "",
                coordinates: { lat: "", lng: "" },

                phone: "",
                email: "",
                website: "",

                farmSize: "",
                // productionMethods: [],
                mainProducts: [],
                seasonality: "",

                deliveryZones: [],
                deliveryMethods: [],
                minimumOrder: "",

                profileImage: "",
                galleryImages: uploadedImages,
            })

            // Redirection vers la page de fermier
            window.location.href = "/fermier"
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error)
            setIsLoading(false)
            setError("Une erreur s'est produite lors de l'envoi des données. Veuillez réessayer plus tard.")
            return
        }

        // Simulation de l'envoi des données
        // setTimeout(() => {
        //     setIsLoading(false)
        //     window.location.href = "/fermier"
        // }, 2000)
    }

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const isStepValid = (step: number) => {
        switch (step) {
            case 1:
                return formData.name && formData.farmTypes.length > 0 && formData.description
            case 2:
                return formData.address && formData.city && formData.zipCode
            case 3:
                return formData.phone && formData.email
            case 4:
                // return formData.farmSize && formData.productionMethods.length > 0
                return formData.farmSize
            case 5:
                return formData.deliveryMethods.length > 0
            case 6:
                return true // Images optionnelles
            default:
                return false
        }
    }

    return (
        <div className="min-h-screen bg-farm-beige-light">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* En-tête de la page */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-farm-green mx-auto mb-4 flex items-center justify-center">
                        <Tractor className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-farm-green-dark mb-2">Ajouter une nouvelle ferme</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Créez le profil de votre ferme pour commencer à vendre vos produits sur CocotteConnect. Remplissez les
                        informations étape par étape.
                    </p>
                </div>

                {/* Indicateur de progression */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${currentStep === step.id
                                        ? "bg-farm-green border-farm-green text-white"
                                        : currentStep > step.id
                                            ? "bg-green-500 border-green-500 text-white"
                                            : "bg-white border-gray-300 text-gray-400"
                                        }`}
                                >
                                    {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`h-0.5 w-16 mx-2 transition-all duration-200 ${currentStep > step.id ? "bg-green-500" : "bg-gray-300"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-farm-green-dark">
                            Étape {currentStep} : {steps[currentStep - 1].title}
                        </h2>
                    </div>
                </div>

                {/* Formulaire */}
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                        {/* Étape 1: Informations générales */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="name" className="text-base font-medium text-farm-green-dark">
                                        Nom de la ferme *
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="Ex: Ferme des Oliviers"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="mt-2 h-12"
                                    />
                                </div>

                                <div>
                                    <Label className="text-base font-medium text-farm-green-dark">
                                        Types d'agriculture *
                                    </Label>
                                    <div className="mt-2 grid grid-cols-2 gap-3">
                                        {farmTypes.map((type) => (
                                            <div
                                                key={type.id}
                                                onClick={() => handleArrayToggle("farmTypes", type.name)}
                                                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${formData.farmTypes.includes(type.name)
                                                    ? "bg-farm-green/10 border-farm-green text-farm-green-dark"
                                                    : "bg-white border-gray-200 hover:border-farm-green/50"
                                                    }`}
                                            >
                                                <span className="text-sm font-medium">{type.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* <div>
                                    <Label className="text-base font-medium text-farm-green-dark">Certifications et labels</Label>
                                    <div className="mt-2 grid grid-cols-2 gap-3">
                                        {certifications.map((cert) => (
                                            <div
                                                key={cert}
                                                onClick={() => handleArrayToggle("certifications", cert)}
                                                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${formData.certifications.includes(cert)
                                                        ? "bg-farm-green/10 border-farm-green text-farm-green-dark"
                                                        : "bg-white border-gray-200 hover:border-farm-green/50"
                                                    }`}
                                            >
                                                <span className="text-sm font-medium">{cert}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}

                                <div>
                                    <Label htmlFor="description" className="text-base font-medium text-farm-green-dark">
                                        Description de la ferme *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Décrivez votre ferme, vos valeurs, votre histoire..."
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        className="mt-2 min-h-[120px]"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Cette description sera visible par vos clients potentiels.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Étape 2: Localisation */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="address" className="text-base font-medium text-farm-green-dark">
                                        Adresse complète *
                                    </Label>
                                    <Input
                                        id="address"
                                        placeholder="123 Chemin des Oliviers"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange("address", e.target.value)}
                                        className="mt-2 h-12"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="city" className="text-base font-medium text-farm-green-dark">
                                            Ville *
                                        </Label>
                                        <Input
                                            id="city"
                                            placeholder="Aix-en-Provence"
                                            value={formData.city}
                                            onChange={(e) => handleInputChange("city", e.target.value)}
                                            className="mt-2 h-12"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="zipCode" className="text-base font-medium text-farm-green-dark">
                                            Code postal *
                                        </Label>
                                        <Input
                                            id="zipCode"
                                            placeholder="13100"
                                            value={formData.zipCode}
                                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                            className="mt-2 h-12"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="region" className="text-base font-medium text-farm-green-dark">
                                            Région
                                        </Label>
                                        <Input
                                            id="region"
                                            placeholder="Provence-Alpes-Côte d'Azur"
                                            value={formData.region}
                                            onChange={(e) => handleInputChange("region", e.target.value)}
                                            className="mt-2 h-12"
                                        />
                                    </div>
                                </div>

                                <div className="bg-farm-beige/50 p-6 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <MapPin className="w-5 h-5 text-farm-green-dark mt-1" />
                                        <div>
                                            <h3 className="font-medium text-farm-green-dark mb-2">Géolocalisation</h3>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Nous utiliserons votre adresse pour localiser automatiquement votre ferme sur la carte. Vous
                                                pourrez ajuster la position si nécessaire.
                                            </p>
                                            <Button variant="outline" size="sm" className="text-farm-green border-farm-green">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                Ajuster la position
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Étape 3: Contact */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="phone" className="text-base font-medium text-farm-green-dark">
                                        Téléphone *
                                    </Label>
                                    <div className="relative mt-2">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="06 12 34 56 78"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            className="pl-10 h-12"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email" className="text-base font-medium text-farm-green-dark">
                                        Email professionnel *
                                    </Label>
                                    <div className="relative mt-2">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="contact@ferme-oliviers.fr"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            className="pl-10 h-12"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="website" className="text-base font-medium text-farm-green-dark">
                                        Site web (optionnel)
                                    </Label>
                                    <div className="relative mt-2">
                                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="website"
                                            type="url"
                                            placeholder="https://www.ferme-oliviers.fr"
                                            value={formData.website}
                                            onChange={(e) => handleInputChange("website", e.target.value)}
                                            className="pl-10 h-12"
                                        />
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <Users className="w-5 h-5 text-blue-600 mt-1" />
                                        <div>
                                            <h3 className="font-medium text-blue-900 mb-2">Visibilité des informations</h3>
                                            <p className="text-sm text-blue-700">
                                                Votre téléphone et email seront visibles par vos clients pour faciliter la communication. Vous
                                                pouvez modifier ces paramètres de confidentialité plus tard dans les réglages.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Étape 4: Production */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="farmSize" className="text-base font-medium text-farm-green-dark">
                                        Taille de l'exploitation *
                                    </Label>
                                    <Select value={formData.farmSize} onValueChange={(value) => handleInputChange("farmSize", value)}>
                                        <SelectTrigger className="mt-2 h-12">
                                            <SelectValue placeholder="Sélectionnez la taille" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="small">Petite (moins de 5 hectares)</SelectItem>
                                            <SelectItem value="medium">Moyenne (5-20 hectares)</SelectItem>
                                            <SelectItem value="large">Grande (20-50 hectares)</SelectItem>
                                            <SelectItem value="very-large">Très grande (plus de 50 hectares)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* <div>
                                    <Label className="text-base font-medium text-farm-green-dark">Méthodes de production *</Label>
                                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {productionMethods.map((method) => (
                                            <div
                                                key={method}
                                                onClick={() => handleArrayToggle("productionMethods", method)}
                                                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${formData.productionMethods.includes(method)
                                                        ? "bg-farm-green/10 border-farm-green text-farm-green-dark"
                                                        : "bg-white border-gray-200 hover:border-farm-green/50"
                                                    }`}
                                            >
                                                <span className="text-sm font-medium">{method}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}

                                <div>
                                    <Label htmlFor="mainProducts" className="text-base font-medium text-farm-green-dark">
                                        Principaux produits
                                    </Label>
                                    <Textarea
                                        id="mainProducts"
                                        placeholder="Ex: Légumes de saison, fruits, œufs, fromages..."
                                        value={formData.mainProducts.join(", ")}
                                        onChange={(e) => handleInputChange("mainProducts", e.target.value.split(", "))}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="seasonality" className="text-base font-medium text-farm-green-dark">
                                        Saisonnalité
                                    </Label>
                                    <Textarea
                                        id="seasonality"
                                        placeholder="Décrivez la disponibilité saisonnière de vos produits..."
                                        value={formData.seasonality}
                                        onChange={(e) => handleInputChange("seasonality", e.target.value)}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Étape 5: Logistique */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <div>
                                    <Label className="text-base font-medium text-farm-green-dark">Modes de livraison *</Label>
                                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {deliveryMethods.map((method) => (
                                            <div
                                                key={method}
                                                onClick={() => handleArrayToggle("deliveryMethods", method)}
                                                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${formData.deliveryMethods.includes(method)
                                                    ? "bg-farm-green/10 border-farm-green text-farm-green-dark"
                                                    : "bg-white border-gray-200 hover:border-farm-green/50"
                                                    }`}
                                            >
                                                <span className="text-sm font-medium">{method}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="deliveryZones" className="text-base font-medium text-farm-green-dark">
                                        Zones de livraison
                                    </Label>
                                    <Textarea
                                        id="deliveryZones"
                                        placeholder="Ex: Aix-en-Provence, Marseille, communes environnantes dans un rayon de 30km..."
                                        value={formData.deliveryZones.join(", ")}
                                        onChange={(e) => handleInputChange("deliveryZones", e.target.value.split(", "))}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="minimumOrder" className="text-base font-medium text-farm-green-dark">
                                        Commande minimum (optionnel)
                                    </Label>
                                    <Input
                                        id="minimumOrder"
                                        placeholder="Ex: 25€"
                                        value={formData.minimumOrder}
                                        onChange={(e) => handleInputChange("minimumOrder", e.target.value)}
                                        className="mt-2 h-12"
                                    />
                                </div>

                                <div className="bg-amber-50 p-6 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />
                                        <div>
                                            <h3 className="font-medium text-amber-900 mb-2">Information importante</h3>
                                            <p className="text-sm text-amber-700">
                                                Ces paramètres de livraison peuvent être modifiés à tout moment depuis votre tableau de bord.
                                                Vous pourrez également définir des tarifs de livraison spécifiques par zone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Étape 6: Images */}
                        {currentStep === 6 && (
                            <div className="space-y-6">
                                <div>
                                    <Label className="text-base font-medium text-farm-green-dark">Photos de votre ferme</Label>
                                    <p className="text-sm text-gray-600 mt-1 mb-4">
                                        Ajoutez des photos attrayantes de votre ferme, vos produits et votre équipe pour rassurer vos
                                        clients.
                                    </p>

                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-farm-green transition-colors">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <p className="text-lg font-medium text-gray-700 mb-2">Cliquez pour ajouter des photos</p>
                                            <p className="text-sm text-gray-500">
                                                PNG, JPG jusqu'à 10MB chacune. Vous pouvez ajouter plusieurs images.
                                            </p>
                                        </label>
                                    </div>
                                </div>

                                {uploadedImages.length > 0 && (
                                    <div>
                                        <h3 className="font-medium text-farm-green-dark mb-4">Images ajoutées ({uploadedImages.length})</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {uploadedImages.map((image, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={image || "/placeholder.svg"}
                                                        alt={`Image ${index + 1}`}
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="bg-green-50 p-6 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <Camera className="w-5 h-5 text-green-600 mt-1" />
                                        <div>
                                            <h3 className="font-medium text-green-900 mb-2">Conseils pour de bonnes photos</h3>
                                            <ul className="text-sm text-green-700 space-y-1">
                                                <li>• Prenez des photos en lumière naturelle</li>
                                                <li>• Montrez vos produits, votre équipe et vos installations</li>
                                                <li>• Évitez les photos floues ou trop sombres</li>
                                                <li>• La première image sera utilisée comme photo de profil</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                    <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Précédent
                    </Button>

                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                            {currentStep} sur {steps.length}
                        </span>
                    </div>

                    {currentStep < steps.length ? (
                        <Button
                            onClick={nextStep}
                            disabled={!isStepValid(currentStep)}
                            className="bg-farm-green hover:bg-farm-green-dark text-white"
                        >
                            Suivant
                            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading || !isStepValid(currentStep)}
                            className="bg-farm-green hover:bg-farm-green-dark text-white"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Création en cours...
                                </div>
                            ) : (
                                "Créer ma ferme"
                            )}
                        </Button>
                    )}
                </div>

                {/* Aide */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Besoin d'aide ?{" "}
                        <Link href="/support" className="text-farm-green hover:underline">
                            Contactez notre équipe support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}