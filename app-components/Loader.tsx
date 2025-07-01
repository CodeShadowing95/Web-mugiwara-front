"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { FarmLoader } from "@/components/ui/farm-loader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
    User,
    Database,
    ShoppingCart,
    BarChart3,
    CheckCircle,
    XCircle,
    RefreshCw,
    Apple,
    UserCog,
} from "lucide-react"

interface LoadingStep {
    id: string
    label: string
    description: string
    icon: any
    variant: "tractor" | "leaf" | "apple" | "carrot" | "wheat"
    status: "pending" | "loading" | "success" | "error"
    data?: any
    error?: string
}

const initialSteps: LoadingStep[] = [
    {
        id: "profile",
        label: "Profil utilisateur",
        description: "Chargement des informations personnelles",
        icon: User,
        variant: "leaf",
        status: "pending",
    },
    {
        id: "role",
        label: "Rôle Fermier",
        description: "Initialisation du compte fermier",
        icon: UserCog,
        variant: "leaf",
        status: "pending",
    },
    {
        id: "farms",
        label: "Données des fermes",
        description: "Checking des informations des fermes",
        icon: Database,
        variant: "tractor",
        status: "pending",
    },
    {
        id: "products",
        label: "Catalogue produits",
        description: "Synchronisation du catalogue",
        icon: Apple,
        variant: "apple",
        status: "pending",
    },
    {
        id: "orders",
        label: "Commandes récentes",
        description: "Checking d'éventuelles commandes",
        icon: ShoppingCart,
        variant: "carrot",
        status: "pending",
    },
    {
        id: "analytics",
        label: "Données analytiques",
        description: "Calcul des statistiques de vente",
        icon: BarChart3,
        variant: "wheat",
        status: "pending",
    },
]

export default function LoadingSimulationPage() {
    const [steps, setSteps] = useState<LoadingStep[]>(initialSteps)
    const [currentStepIndex, setCurrentStepIndex] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [loadingMessage, setLoadingMessage] = useState("")
    const hasStartedRef = useRef(false)

    const fetchStepData = async (step: LoadingStep) => {
        try {
            let token;
            if(typeof window !== 'undefined') {
                token = localStorage.getItem('jwt_token')
            }

            console.log("Token: ", token);
            

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

            let response;
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            
            switch (step.id) {
                case 'profile':
                    response = await fetch(`${apiUrl}/api/current-user`, options)
                    break;
                case 'farms':
                    // On récupère l'user
                    const user = JSON.parse(localStorage.getItem('user') || '{}')
                    if (!user || !user.id) {
                        throw new Error('ID utilisateur non trouvé')
                    }
                    response = await fetch(`${apiUrl}/api/public/v1/farms/farmer/${user.id}`, options)
                    break;
                case 'role':
                    response = await fetch(`${apiUrl}/api/become-farmer`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    });
                    break;
                case 'products':
                    // response = await fetch('/api/v1/products', options)
                    // Simuler une bonne response de produits vides
                    const emptyProducts = {
                        data: [],
                        total: 0,
                        page: 1,
                        limit: 10,
                        pages: 1
                    }
                    response = new Response(JSON.stringify(emptyProducts), {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    break;
                case 'orders':
                    // response = await fetch('/api/v1/orders', options)
                    // Simuler une bonne response de commandes vides
                    const emptyOrders = {
                        data: [],
                        total: 0,
                        page: 1,
                        limit: 10,
                        pages: 1
                    }
                    response = new Response(JSON.stringify(emptyOrders), {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    break;
                case 'analytics':
                    // response = await fetch('/api/v1/analytics', options)
                    // Simuler une bonne response de données vides
                    const emptyAnalytics = {
                        data: [],
                        total: 0,
                        page: 1,
                        limit: 10,
                        pages: 1
                    }
                    response = new Response(JSON.stringify(emptyAnalytics), {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    break;
                default:
                    throw new Error('Étape inconnue')
            }

            if (!response.ok) {
                console.log(response);
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error(`Erreur lors du chargement de ${step.id}:`, error)
            throw error
        }
    }

    const startSimulation = async () => {
        if (isLoading) return;

        setIsLoading(true)
        setProgress(0)

        const stepsLength = steps.length

        

        // for (let i = 0; i < steps.length; i++) {
        //     const step = steps[i]

        //     setCurrentStepIndex(i)
        //     setLoadingMessage(step.description)
        //     setProgress((i / steps.length) * 100)

        //     // Marquer l'étape comme "loading"
        //     setSteps((prev) =>
        //         prev.map((s, index) =>
        //             index === i ? { ...s, status: "loading" } : s
        //         )
        //     )

        //     try {
        //         const data = await fetchStepData(step)

        //         if (!data) {
        //             throw new Error('Données de réponse manquantes')
        //         }

        //         if (data.error) {
        //             throw new Error(data.error)
        //         }

        //         // Stocker dans localStorage selon le type d'étape
        //         switch (step.id) {
        //             case 'profile':
        //                 localStorage.setItem('user', JSON.stringify(data))
        //                 break
        //             case 'farms':
        //                 localStorage.setItem('farms', JSON.stringify(data))
        //                 break
        //             case 'role':
        //                 // Mise à jour du profil utilisateur après être devenu fermier
        //                 if (!data.message || data.message !== 'Déjà fermier') {
        //                     const updatedUser = JSON.parse(localStorage.getItem('user') || '{}')
        //                     updatedUser.roles = [...(updatedUser.roles || []), 'ROLE_FARMER']
        //                     localStorage.setItem('user', JSON.stringify(updatedUser))
        //                 }
        //                 break
        //             default:
        //                 break
        //         }

        //         // Marquer comme succès
        //         setSteps((prev) =>
        //             prev.map((s, index) =>
        //                 index === i ? { ...s, status: "success", data } : s
        //             )
        //         )

        //         // Pause courte entre chaque étape pour l'animation
        //         await new Promise(resolve => setTimeout(resolve, 500))

        //     } catch (error) {
        //         const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
        //         setSteps((prev) =>
        //             prev.map((s, index) =>
        //                 index === i ? { ...s, status: "error", error: errorMessage } : s
        //             )
        //         )
        //         setIsLoading(false)
        //         setLoadingMessage(`Erreur lors du chargement de ${step.label}: ${errorMessage}`)
        //         return
        //     }
        // }

        setProgress(100)
        setLoadingMessage("Chargement terminé avec succès !")
        setIsLoading(false)
        setCurrentStepIndex(-1)
    }

    useEffect(() => {
        const allSuccess = steps.every(step => step.status === "success")
        if (allSuccess) {
            setTimeout(() => {
                window.location.href = "/fermier"
            }, 1000)
        }
    }, [steps])

    useEffect(() => {
        if (!hasStartedRef.current) {
            hasStartedRef.current = true
            startSimulation()
        }
    }, [])

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "success":
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case "error":
                return <XCircle className="w-5 h-5 text-red-500" />
            case "loading":
                return <RefreshCw className="w-5 h-5 text-farm-orange animate-spin" />
            default:
                return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "success":
                return "border-green-500 bg-green-50"
            case "error":
                return "border-red-500 bg-red-50"
            case "loading":
                return "border-farm-orange bg-[var(--farm-orange)]/10"
            default:
                return "border-gray-200 bg-white"
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-50 min-h-screen bg-[var(--farm-beige-light)]/70 backdrop-blur-lg backdrop-filter bg-opacity-10">
                <div className="max-w-6xl mx-auto p-8 space-y-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-farm-green-dark mb-4">Préparation de votre espace fermier</h1>
                        <p className="text-gray-600 text-lg">Nous configurons votre compte et synchronisons vos données</p>
                    </div>

                    {/* Étapes de chargement */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {steps.map((step, index) => {
                            const IconComponent = step.icon
                            const isCurrentStep = currentStepIndex === index

                            return (
                                <Card
                                    key={step.id}
                                    className={`border-2 transition-all duration-300 ${getStatusColor(step.status)} ${isCurrentStep ? "ring-2 ring-farm-orange ring-offset-2 scale-105" : ""}`}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                {step.status === "loading" ? (
                                                    <FarmLoader size="sm" variant={step.variant} />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-[var(--farm-green)]/10 flex items-center justify-center">
                                                        <IconComponent className="w-6 h-6 text-farm-green-dark" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-semibold">{step.label}</h3>
                                                    {getStatusIcon(step.status)}
                                                </div>
                                                <p className="text-sm text-gray-600">{step.description}</p>
                                                {step.status === "success" && step.data && (
                                                    <div className="mt-2 p-2 bg-green-50 rounded-md">
                                                        <p className="text-sm text-green-700">Données chargées avec succès</p>
                                                    </div>
                                                )}
                                                {step.status === "error" && step.error && (
                                                    <div className="mt-2">
                                                        <div className="p-2 bg-red-50 rounded-md mb-2">
                                                            <p className="text-sm text-red-700">{step.error}</p>
                                                        </div>
                                                        <Button
                                                            onClick={async () => {
                                                                setSteps((prev) => prev.map((s, idx) =>
                                                                    idx === index ? { ...s, status: "loading", error: undefined } : s
                                                                ))
                                                                try {
                                                                    const data = await fetchStepData(step)
                                                                    setSteps((prev) => prev.map((s, idx) =>
                                                                        idx === index ? { ...s, status: "success", data, error: undefined } : s
                                                                    ))
                                                                } catch (error) {
                                                                    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
                                                                    setSteps((prev) => prev.map((s, idx) =>
                                                                        idx === index ? { ...s, status: "error", error: errorMessage } : s
                                                                    ))
                                                                }
                                                            }}
                                                            size="sm"
                                                            variant="destructive"
                                                            className="w-full"
                                                        >
                                                            Réessayer
                                                        </Button>
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-between">
                                                    <Badge
                                                        variant={
                                                            step.status === "success"
                                                                ? "default"
                                                                : step.status === "error"
                                                                    ? "destructive"
                                                                    : step.status === "loading"
                                                                        ? "secondary"
                                                                        : "outline"
                                                        }
                                                        className={
                                                            step.status === "success"
                                                                ? "bg-green-100 text-green-800"
                                                                : step.status === "loading"
                                                                    ? "bg-farm-orange/10 text-farm-orange"
                                                                    : ""
                                                        }
                                                    >
                                                        {step.status === "pending" && "En attente"}
                                                        {step.status === "loading" && "Chargement..."}
                                                        {step.status === "success" && "Terminé"}
                                                        {step.status === "error" && "Erreur"}
                                                    </Badge>
                                                    <span className="text-xs text-gray-500">Étape {index + 1}/{steps.length}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Display current step information */}
            <div className="fixed top-8 left-1/2 transform -translate-x-1/2">
                <Card className="w-[400px] bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                            {currentStepIndex >= 0 ? steps[currentStepIndex].label : 'Initialisation...'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={progress} className="mb-2" />
                        <p className="text-sm text-gray-600">{loadingMessage}</p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}