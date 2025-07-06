"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    ArrowLeft,
    Upload,
    Package,
    Euro,
    Camera,
    X,
    Check,
    Leaf,
    Tag,
    Truck,
    Eye,
    Thermometer,
    Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

export default function AddProduct() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [uploadedImages, setUploadedImages] = useState<string[]>([])

    // Données des fermes de l'utilisateur
    const [userFarms] = useState([
        {
            id: 1,
            name: "Ferme des Oliviers",
            location: "Aix-en-Provence, Provence",
            type: "Bio & Légumes",
            avatar: "FO",
            color: "bg-farm-green",
            categories: ["Légumes", "Produits transformés", "Produits laitiers"],
        },
        {
            id: 2,
            name: "Les Jardins de Marie",
            location: "Tours, Loire",
            type: "Fruits & Légumes",
            avatar: "JM",
            color: "bg-farm-orange",
            categories: ["Fruits", "Légumes", "Produits transformés"],
        },
        {
            id: 3,
            name: "Élevage du Soleil",
            location: "Caen, Normandie",
            type: "Produits laitiers",
            avatar: "ES",
            color: "bg-blue-600",
            categories: ["Produits laitiers", "Produits transformés"],
        },
    ])

    const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null)
    const selectedFarm = userFarms.find((farm) => farm.id === selectedFarmId)

    // États du formulaire
    const [formData, setFormData] = useState({
        // Informations générales
        name: "",
        description: "",
        category: "",
        tags: [] as string[],

        // Détails produit
        weight: "",
        unit: "",
        season: "",
        origin: "",
        variety: "",
        certifications: [] as string[],

        // Prix et stock
        price: "",
        originalPrice: "",
        stock: "",
        minOrder: "",
        maxOrder: "",
        isPromoted: false,
        promotionDescription: "",

        // Images
        mainImage: "",
        galleryImages: [] as string[],

        // Logistique
        storageConditions: "",
        shelfLife: "",
        preparationTime: "",
        availabilityStart: "",
        availabilityEnd: "",
        deliveryMethods: [] as string[],

        // Publication
        status: "brouillon",
        publishDate: "",
        isVisible: true,
    })

    const steps = [
        { id: 1, title: "Sélection de la ferme", icon: Leaf },
        { id: 2, title: "Informations générales", icon: Package },
        { id: 3, title: "Détails du produit", icon: Tag },
        { id: 4, title: "Prix et stock", icon: Euro },
        { id: 5, title: "Images", icon: Camera },
        { id: 6, title: "Logistique", icon: Truck },
        { id: 7, title: "Révision", icon: Eye },
    ]

    const categories = ["Légumes", "Fruits", "Produits laitiers", "Produits transformés", "Boulangerie", "Viandes"]

    const units = ["kg", "g", "L", "mL", "pièce", "botte", "barquette", "pot", "sachet"]

    const seasons = [
        "Toute l'année",
        "Printemps",
        "Été",
        "Automne",
        "Hiver",
        "Printemps-Été",
        "Été-Automne",
        "Automne-Hiver",
        "Hiver-Printemps",
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
    ]

    const deliveryMethods = [
        "Livraison à domicile",
        "Point de retrait",
        "Marché local",
        "Vente à la ferme",
        "AMAP",
        "Magasins partenaires",
    ]

    const storageOptions = [
        "Température ambiante",
        "Réfrigéré (2-8°C)",
        "Congelé (-18°C)",
        "Frais (8-15°C)",
        "Sec et aéré",
        "À l'abri de la lumière",
    ]

    const suggestedTags = [
        "bio",
        "local",
        "saison",
        "frais",
        "artisanal",
        "fermier",
        "traditionnel",
        "premium",
        "nouveauté",
        "promotion",
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
            const newImages = Array.from(files).map(
                (file, index) => `https://api.dicebear.com/9.x/shapes/svg?seed=Felix?height=200&width=300&text=Image${uploadedImages.length + index + 1}`,
            )
            setUploadedImages((prev) => [...prev, ...newImages])
        }
    }

    const removeImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        // Simulation de l'envoi des données
        setTimeout(() => {
            setIsLoading(false)
            router.push("/fermier/products?new-product=success")
        }, 2000)
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
                return selectedFarmId !== null
            case 2:
                return formData.name && formData.category && formData.description
            case 3:
                return formData.weight && formData.unit && formData.season
            case 4:
                return formData.price && formData.stock
            case 5:
                return true // Images optionnelles
            case 6:
                return formData.storageConditions && formData.deliveryMethods.length > 0
            case 7:
                return true // Révision
            default:
                return false
        }
    }

    const generateSKU = () => {
        if (!selectedFarm || !formData.name || !formData.category) return ""
        const farmPrefix = selectedFarm.avatar
        const categoryPrefix = formData.category.substring(0, 3).toUpperCase()
        const namePrefix = formData.name.substring(0, 3).toUpperCase()
        const randomNum = Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")
        return `${farmPrefix}-${categoryPrefix}-${namePrefix}-${randomNum}`
    }

    return (
        <div className="min-h-screen bg-[var(--farm-beige-light)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* En-tête de la page */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-[var(--farm-green)] mx-auto mb-4 flex items-center justify-center">
                        <Package className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--farm-green-dark)] mb-2">Ajouter un nouveau produit</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Créez une fiche produit complète pour enrichir votre catalogue et attirer vos clients.
                    </p>
                </div>

                {/* Indicateur de progression */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4 overflow-x-auto">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${currentStep === step.id
                                            ? "bg-[var(--farm-green)] border-[var(--farm-green)] text-white"
                                            : currentStep > step.id
                                                ? "bg-green-500 border-green-500 text-white"
                                                : "bg-white border-gray-300 text-gray-400"
                                        }`}
                                >
                                    {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`h-0.5 w-12 transition-all duration-200 ${currentStep > step.id ? "bg-green-500" : "bg-gray-300"
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
                        {/* Étape 1: Sélection de la ferme */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-lg font-semibold text-[var(--farm-green-dark)] mb-2">
                                        Sélectionnez la ferme pour ce produit
                                    </h3>
                                    <p className="text-gray-600">
                                        Choisissez l'exploitation agricole à laquelle ce produit sera associé.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {userFarms.map((farm) => (
                                        <Card
                                            key={farm.id}
                                            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${selectedFarmId === farm.id
                                                    ? "ring-2 ring-[var(--farm-green)] bg-[var(--farm-green)]/5 border-[var(--farm-green)]"
                                                    : "border-gray-200 hover:border-[var(--farm-green)]/50"
                                                }`}
                                            onClick={() => setSelectedFarmId(farm.id)}
                                        >
                                            <CardContent className="p-6">
                                                <Avatar className="h-12 w-12 mb-2">
                                                    <AvatarFallback className={`${farm.color} text-white font-semibold`}>
                                                        {farm.avatar}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex items-center space-x-4 mb-4">
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-farm-green-dark">{farm.name}</h4>
                                                        <p className="text-sm text-gray-500">{farm.location}</p>
                                                        <p className="text-xs text-gray-400">{farm.type}</p>
                                                    </div>
                                                    {selectedFarmId === farm.id && (
                                                        <div className="w-6 h-6 rounded-full bg-[var(--farm-green)] flex items-center justify-center">
                                                            <Check className="w-4 h-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                                                        Catégories disponibles
                                                    </p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {farm.categories.map((category) => (
                                                            <Badge key={category} variant="outline" className="text-xs">
                                                                {category}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                {selectedFarmId && (
                                    <div className="mt-6 p-4 bg-[var(--farm-green)]/10 rounded-lg border border-[var(--farm-green)]/20">
                                        <div className="flex items-center space-x-3">
                                            <Check className="w-5 h-5 text-[var(--farm-green)]" />
                                            <div>
                                                <p className="font-medium text-[var(--farm-green-dark)]">Ferme sélectionnée : {selectedFarm?.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    Le produit sera ajouté au catalogue de cette exploitation.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Étape 2: Informations générales */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className={`${selectedFarm?.color} text-white font-semibold`}>
                                            {selectedFarm?.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-farm-green-dark">{selectedFarm?.name}</p>
                                        <p className="text-sm text-gray-500">Nouveau produit</p>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="name" className="text-base font-medium text-farm-green-dark">
                                        Nom du produit *
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="Ex: Tomates cerises bio"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        className="mt-2 h-12"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="category" className="text-base font-medium text-farm-green-dark">
                                        Catégorie *
                                    </Label>
                                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                        <SelectTrigger className="mt-2 h-12">
                                            <SelectValue placeholder="Sélectionnez une catégorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {selectedFarm?.categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="description" className="text-base font-medium text-farm-green-dark">
                                        Description du produit *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Décrivez votre produit, ses qualités, son goût, sa méthode de production..."
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        className="mt-2 min-h-[120px]"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Une description détaillée aide vos clients à mieux comprendre votre produit.
                                    </p>
                                </div>

                                <div>
                                    <Label className="text-base font-medium text-farm-green-dark">Tags (optionnel)</Label>
                                    <p className="text-sm text-gray-500 mb-3">Ajoutez des mots-clés pour faciliter la recherche</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {suggestedTags.map((tag) => (
                                            <div
                                                key={tag}
                                                onClick={() => handleArrayToggle("tags", tag)}
                                                className={`p-2 rounded-lg border cursor-pointer transition-all duration-200 text-center ${formData.tags.includes(tag)
                                                        ? "bg-farm-green/10 border-farm-green text-farm-green-dark"
                                                        : "bg-white border-gray-200 hover:border-farm-green/50"
                                                    }`}
                                            >
                                                <span className="text-sm font-medium">{tag}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {formData.tags.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {formData.tags.map((tag) => (
                                                <Badge key={tag} className="bg-farm-green text-white">
                                                    {tag}
                                                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => handleArrayToggle("tags", tag)} />
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Étape 3: Détails du produit */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="weight" className="text-base font-medium text-farm-green-dark">
                                            Poids/Quantité *
                                        </Label>
                                        <Input
                                            id="weight"
                                            placeholder="Ex: 500"
                                            value={formData.weight}
                                            onChange={(e) => handleInputChange("weight", e.target.value)}
                                            className="mt-2 h-12"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="unit" className="text-base font-medium text-farm-green-dark">
                                            Unité *
                                        </Label>
                                        <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                                            <SelectTrigger className="mt-2 h-12">
                                                <SelectValue placeholder="Sélectionnez l'unité" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {units.map((unit) => (
                                                    <SelectItem key={unit} value={unit}>
                                                        {unit}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="season" className="text-base font-medium text-farm-green-dark">
                                        Saisonnalité *
                                    </Label>
                                    <Select value={formData.season} onValueChange={(value) => handleInputChange("season", value)}>
                                        <SelectTrigger className="mt-2 h-12">
                                            <SelectValue placeholder="Sélectionnez la saison" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {seasons.map((season) => (
                                                <SelectItem key={season} value={season}>
                                                    {season}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="origin" className="text-base font-medium text-farm-green-dark">
                                        Origine/Terroir
                                    </Label>
                                    <Input
                                        id="origin"
                                        placeholder="Ex: Vallée de la Loire, Terroir provençal..."
                                        value={formData.origin}
                                        onChange={(e) => handleInputChange("origin", e.target.value)}
                                        className="mt-2 h-12"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="variety" className="text-base font-medium text-farm-green-dark">
                                        Variété/Race
                                    </Label>
                                    <Input
                                        id="variety"
                                        placeholder="Ex: Charlotte, Golden, Normande..."
                                        value={formData.variety}
                                        onChange={(e) => handleInputChange("variety", e.target.value)}
                                        className="mt-2 h-12"
                                    />
                                </div>

                                <div>
                                    <Label className="text-base font-medium text-farm-green-dark">Certifications et labels</Label>
                                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
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
                                </div>
                            </div>
                        )}

                        {/* Étape 4: Prix et stock */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="price" className="text-base font-medium text-farm-green-dark">
                                            Prix de vente *
                                        </Label>
                                        <div className="relative mt-2">
                                            <Input
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                placeholder="Ex: 4.50"
                                                value={formData.price}
                                                onChange={(e) => handleInputChange("price", e.target.value)}
                                                className="pr-8 h-12"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="originalPrice" className="text-base font-medium text-farm-green-dark">
                                            Prix barré (optionnel)
                                        </Label>
                                        <div className="relative mt-2">
                                            <Input
                                                id="originalPrice"
                                                type="number"
                                                step="0.01"
                                                placeholder="Ex: 5.00"
                                                value={formData.originalPrice}
                                                onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                                                className="pr-8 h-12"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="stock" className="text-base font-medium text-farm-green-dark">
                                        Stock initial *
                                    </Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        placeholder="Ex: 50"
                                        value={formData.stock}
                                        onChange={(e) => handleInputChange("stock", e.target.value)}
                                        className="mt-2 h-12"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Nombre d'unités disponibles à la vente</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="minOrder" className="text-base font-medium text-farm-green-dark">
                                            Commande minimum
                                        </Label>
                                        <Input
                                            id="minOrder"
                                            type="number"
                                            placeholder="Ex: 1"
                                            value={formData.minOrder}
                                            onChange={(e) => handleInputChange("minOrder", e.target.value)}
                                            className="mt-2 h-12"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="maxOrder" className="text-base font-medium text-farm-green-dark">
                                            Commande maximum
                                        </Label>
                                        <Input
                                            id="maxOrder"
                                            type="number"
                                            placeholder="Ex: 10"
                                            value={formData.maxOrder}
                                            onChange={(e) => handleInputChange("maxOrder", e.target.value)}
                                            className="mt-2 h-12"
                                        />
                                    </div>
                                </div>

                                <div className="p-4 bg-farm-beige/50 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <Checkbox
                                            id="isPromoted"
                                            checked={formData.isPromoted}
                                            onCheckedChange={(checked) => handleInputChange("isPromoted", checked)}
                                        />
                                        <div className="flex-1">
                                            <Label htmlFor="isPromoted" className="font-medium text-farm-green-dark cursor-pointer">
                                                Produit en promotion
                                            </Label>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Marquez ce produit comme étant en promotion pour le mettre en avant
                                            </p>
                                            {formData.isPromoted && (
                                                <div className="mt-3">
                                                    <Label htmlFor="promotionDescription" className="text-sm font-medium text-farm-green-dark">
                                                        Description de la promotion
                                                    </Label>
                                                    <Input
                                                        id="promotionDescription"
                                                        placeholder="Ex: -20% cette semaine, Offre spéciale..."
                                                        value={formData.promotionDescription}
                                                        onChange={(e) => handleInputChange("promotionDescription", e.target.value)}
                                                        className="mt-1"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Aperçu du prix */}
                                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                                    <h4 className="font-medium text-farm-green-dark mb-3">Aperçu du prix</h4>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-2xl font-bold text-farm-green-dark">
                                                {formData.price ? `${formData.price}€` : "0.00€"}
                                            </span>
                                            {formData.originalPrice && (
                                                <span className="text-lg text-gray-500 line-through">{formData.originalPrice}€</span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {formData.weight && formData.unit && `pour ${formData.weight}${formData.unit}`}
                                        </div>
                                    </div>
                                    {formData.isPromoted && formData.promotionDescription && (
                                        <Badge className="bg-red-500 text-white mt-2">{formData.promotionDescription}</Badge>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Étape 5: Images */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <div>
                                    <Label className="text-base font-medium text-farm-green-dark">Photos du produit</Label>
                                    <p className="text-sm text-gray-600 mt-1 mb-4">
                                        Ajoutez des photos attrayantes de votre produit pour séduire vos clients.
                                    </p>

                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[var(--farm-green)] transition-colors">
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
                                                PNG, JPG jusqu'à 10MB chacune. La première image sera la photo principale.
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
                                                        src={image || "https://api.dicebear.com/9.x/shapes/svg?seed=Felix"}
                                                        alt={`Image ${index + 1}`}
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                    {index === 0 && (
                                                        <Badge className="absolute top-2 left-2 bg-[var(--farm-green)] text-white">Photo principale</Badge>
                                                    )}
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

                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <Camera className="w-5 h-5 text-blue-600 mt-1" />
                                        <div>
                                            <h3 className="font-medium text-blue-900 mb-2">Conseils pour de bonnes photos</h3>
                                            <ul className="text-sm text-blue-700 space-y-1">
                                                <li>• Prenez des photos en lumière naturelle</li>
                                                <li>• Montrez le produit sous différents angles</li>
                                                <li>• Évitez les photos floues ou trop sombres</li>
                                                <li>• Mettez en valeur la fraîcheur et la qualité</li>
                                                <li>• Ajoutez des photos d'ambiance (produit en situation)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Étape 6: Logistique */}
                        {currentStep === 6 && (
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="storageConditions" className="text-base font-medium text-farm-green-dark">
                                        Conditions de conservation *
                                    </Label>
                                    <Select
                                        value={formData.storageConditions}
                                        onValueChange={(value) => handleInputChange("storageConditions", value)}
                                    >
                                        <SelectTrigger className="mt-2 h-12">
                                            <SelectValue placeholder="Sélectionnez les conditions" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {storageOptions.map((option) => (
                                                <SelectItem key={option} value={option}>
                                                    <div className="flex items-center space-x-2">
                                                        <Thermometer className="w-4 h-4" />
                                                        <span>{option}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="shelfLife" className="text-base font-medium text-farm-green-dark">
                                            Durée de conservation
                                        </Label>
                                        <Input
                                            id="shelfLife"
                                            placeholder="Ex: 7 jours, 2 semaines, 1 mois..."
                                            value={formData.shelfLife}
                                            onChange={(e) => handleInputChange("shelfLife", e.target.value)}
                                            className="mt-2 h-12"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="preparationTime" className="text-base font-medium text-farm-green-dark">
                                            Délai de préparation
                                        </Label>
                                        <Input
                                            id="preparationTime"
                                            placeholder="Ex: 24h, 2 jours..."
                                            value={formData.preparationTime}
                                            onChange={(e) => handleInputChange("preparationTime", e.target.value)}
                                            className="mt-2 h-12"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="availabilityStart" className="text-base font-medium text-farm-green-dark">
                                            Disponible à partir du
                                        </Label>
                                        <Input
                                            id="availabilityStart"
                                            type="date"
                                            value={formData.availabilityStart}
                                            onChange={(e) => handleInputChange("availabilityStart", e.target.value)}
                                            className="mt-2 h-12"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="availabilityEnd" className="text-base font-medium text-farm-green-dark">
                                            Disponible jusqu'au
                                        </Label>
                                        <Input
                                            id="availabilityEnd"
                                            type="date"
                                            value={formData.availabilityEnd}
                                            onChange={(e) => handleInputChange("availabilityEnd", e.target.value)}
                                            className="mt-2 h-12"
                                        />
                                    </div>
                                </div>

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

                                <div className="bg-amber-50 p-6 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <Clock className="w-5 h-5 text-amber-600 mt-1" />
                                        <div>
                                            <h3 className="font-medium text-amber-900 mb-2">Information importante</h3>
                                            <p className="text-sm text-amber-700">
                                                Ces paramètres logistiques peuvent être modifiés à tout moment depuis la fiche produit. Ils
                                                aident vos clients à mieux planifier leurs commandes.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Étape 7: Révision */}
                        {currentStep === 7 && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-lg font-semibold text-farm-green-dark mb-2">Révision de votre produit</h3>
                                    <p className="text-gray-600">Vérifiez toutes les informations avant de publier votre produit.</p>
                                </div>

                                {/* Aperçu du produit */}
                                <Card className="border border-gray-200">
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4 mb-4">
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                                {uploadedImages.length > 0 ? (
                                                    <img
                                                        src={uploadedImages[0] || "https://api.dicebear.com/9.x/shapes/svg?seed=Felix"}
                                                        alt="Produit"
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <Package className="w-8 h-8 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-semibold text-farm-green-dark">
                                                    {formData.name || "Nom du produit"}
                                                </h4>
                                                <p className="text-sm text-gray-500 mb-2">{formData.category}</p>
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-2xl font-bold text-farm-green-dark">
                                                        {formData.price ? `${formData.price}€` : "0.00€"}
                                                    </span>
                                                    {formData.originalPrice && (
                                                        <span className="text-lg text-gray-500 line-through">{formData.originalPrice}€</span>
                                                    )}
                                                    <span className="text-sm text-gray-600">
                                                        {formData.weight && formData.unit && `${formData.weight}${formData.unit}`}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">SKU généré</p>
                                                <p className="font-mono text-sm font-medium">{generateSKU()}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h5 className="font-medium text-farm-green-dark mb-2">Informations générales</h5>
                                                <div className="space-y-1 text-sm">
                                                    <p>
                                                        <span className="text-gray-500">Ferme:</span> {selectedFarm?.name}
                                                    </p>
                                                    <p>
                                                        <span className="text-gray-500">Catégorie:</span> {formData.category}
                                                    </p>
                                                    <p>
                                                        <span className="text-gray-500">Saison:</span> {formData.season}
                                                    </p>
                                                    <p>
                                                        <span className="text-gray-500">Stock:</span> {formData.stock} unités
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-farm-green-dark mb-2">Logistique</h5>
                                                <div className="space-y-1 text-sm">
                                                    <p>
                                                        <span className="text-gray-500">Conservation:</span> {formData.storageConditions}
                                                    </p>
                                                    <p>
                                                        <span className="text-gray-500">Livraison:</span> {formData.deliveryMethods.join(", ")}
                                                    </p>
                                                    {formData.shelfLife && (
                                                        <p>
                                                            <span className="text-gray-500">Durée de vie:</span> {formData.shelfLife}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {formData.description && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <h5 className="font-medium text-farm-green-dark mb-2">Description</h5>
                                                <p className="text-sm text-gray-700">{formData.description}</p>
                                            </div>
                                        )}

                                        {formData.tags.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <h5 className="font-medium text-farm-green-dark mb-2">Tags</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.tags.map((tag) => (
                                                        <Badge key={tag} variant="outline">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Options de publication */}
                                <Card className="border border-gray-200">
                                    <CardContent className="p-6">
                                        <h4 className="font-medium text-farm-green-dark mb-4">Options de publication</h4>

                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="status" className="text-base font-medium text-farm-green-dark">
                                                    Statut du produit
                                                </Label>
                                                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                                                    <SelectTrigger className="mt-2 h-12">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="brouillon">Brouillon (non visible)</SelectItem>
                                                        <SelectItem value="disponible">Publié et disponible</SelectItem>
                                                        <SelectItem value="programmé">Publication programmée</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {formData.status === "programmé" && (
                                                <div>
                                                    <Label htmlFor="publishDate" className="text-base font-medium text-farm-green-dark">
                                                        Date de publication
                                                    </Label>
                                                    <Input
                                                        id="publishDate"
                                                        type="datetime-local"
                                                        value={formData.publishDate}
                                                        onChange={(e) => handleInputChange("publishDate", e.target.value)}
                                                        className="mt-2 h-12"
                                                    />
                                                </div>
                                            )}

                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="isVisible"
                                                    checked={formData.isVisible}
                                                    onCheckedChange={(checked) => handleInputChange("isVisible", checked)}
                                                />
                                                <Label htmlFor="isVisible" className="font-medium text-farm-green-dark cursor-pointer">
                                                    Visible dans le catalogue public
                                                </Label>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
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
                                "Créer le produit"
                            )}
                        </Button>
                    )}
                </div>

                {/* Aide */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Besoin d'aide ?{" "}
                        <Link href="/support" className="text-farm-green hover:underline">
                            Consultez notre guide de création de produits
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
