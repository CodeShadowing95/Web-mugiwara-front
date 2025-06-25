"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, Tractor, Wheat, Shovel, SunIcon, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FermierLoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccess("")
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL
            const response = await fetch(`${apiUrl}/api/login_check`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            })
            if (!response.ok) {
                setIsLoading(false)
                if (response.status === 401) {
                    setError("Identifiants invalides.")
                } else {
                    setError("Erreur interne du serveur.")
                }
                return
            }
            const res = await response.json()
            localStorage.setItem("jwt_token", res.token)
            setSuccess("Connexion réussie ! Redirection...")
            setTimeout(() => {
                router.push("/fermier")
            }, 1200)
        } catch (err) {
            setError("Erreur de connexion. Veuillez réessayer.")
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Top/Left side - Hero Section */}
            <div
                className="w-full md:w-1/2 min-h-[30vh] md:min-h-screen relative overflow-hidden"
                style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/farm.jpg') no-repeat center center`,
                    backgroundSize: "cover",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--farm-green-dark)] to-transparent"></div>

                {/* Floating elements with CSS animations */}
                <div className="absolute top-20 left-20 animate-float">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
                        <Tractor className="w-8 h-8 text-white" />
                    </div>
                </div>

                <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: "1s" }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
                        <Wheat className="w-6 h-6 text-white" />
                    </div>
                </div>

                <div className="absolute bottom-40 left-32 animate-float" style={{ animationDelay: "2s" }}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
                        <Shovel className="w-7 h-7 text-white" />
                    </div>
                </div>

                <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: "0.5s" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
                        <SunIcon className="w-5 h-5 text-white" />
                    </div>
                </div>

                {/* Main content */}
                <div className="flex flex-col justify-center items-center w-full h-full p-8 md:p-12 relative z-10">
                    <div className="text-center animate-slide-in">
                        <div className="mb-8">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center grow-animation bg-white/20 backdrop-blur-sm">
                                <Tractor className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Espace Producteur</h1>
                            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-md">
                                Gérez vos produits, suivez vos commandes et connectez-vous avec vos clients
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom/Right side - Login Form */}
            <div
                className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12"
                style={{ backgroundColor: "var(--farm-beige-light)" }}
            >
                <div className="w-full max-w-md animate-fade-in">
                    <div className="mb-2 text-center flex justify-center items-center gap-2">
                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                        <Link href="/" className="text-sm text-gray-600 hover:underline">
                            Retour à l'accueil
                        </Link>
                    </div>

                    <Card className="border-0 shadow-2xl bg-white">
                        <CardHeader className="space-y-1 pb-8">
                            <div className="flex items-center justify-center mb-6 md:hidden">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: "var(--farm-green)" }}
                                >
                                    <Tractor className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-center" style={{ color: "var(--farm-green-dark)" }}>
                                Espace Fermier
                            </CardTitle>
                            <CardDescription className="text-center text-gray-600">
                                Accédez à votre espace producteur CocotteConnect ou
                                <Link
                                    href="/fermier/register"
                                    className="ml-1 text-[var(--farm-green)] hover:text-[var(--farm-green-dark)] transition-colors duration-200 font-semibold hover:underline inline-flex items-center gap-1"
                                >
                                    créez votre compte ici
                                    <Tractor className="w-4 h-4" />
                                </Link>
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium" style={{ color: "var(--farm-green-dark)" }}>
                                        Email professionnel
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="votre@ferme.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 h-12 border-gray-200 focus:border-[var(--farm-green)] focus:ring-[var(--farm-green)]"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium" style={{ color: "var(--farm-green-dark)" }}>
                                        Mot de passe
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10 pr-10 h-12 border-gray-200 focus:border-[var(--farm-green)] focus:ring-[var(--farm-green)]"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="rounded border-gray-300 text-[var(--farm-green)] focus:ring-[var(--farm-green)]"
                                        />
                                        <Label htmlFor="remember" className="text-sm text-gray-600">
                                            Rester connecté
                                        </Label>
                                    </div>
                                    <Link
                                        href="/fermier/forgot-password"
                                        className="text-sm hover:underline"
                                        style={{ color: "var(--farm-green)" }}
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center">{error}</div>
                                )}

                                {success && (
                                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm text-center">{success}</div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-white font-medium transition-all duration-200 hover:shadow-lg"
                                    style={{
                                        backgroundColor: "var(--farm-green-dark)",
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Connexion...</span>
                                        </div>
                                    ) : (
                                        "Accéder à mon espace"
                                    )}
                                </Button>
                            </form>

                            {/* <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator className="w-full" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-gray-500">Besoin d'aide ?</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-center">
                                    <Link
                                        href="/fermier/register"
                                        className="text-sm font-medium hover:underline block mb-2"
                                        style={{ color: "var(--farm-green)" }}
                                    >
                                        Devenir producteur partenaire
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="text-sm hover:underline block"
                                        style={{ color: "var(--farm-green)" }}
                                    >
                                        Contacter notre équipe support
                                    </Link>
                                </div>
                            </div> */}

                            <div className="pt-2">
                                <div className="p-4 rounded-lg bg-farm-beige/50 border border-farm-beige">
                                    <h3 className="font-medium text-sm mb-2 text-farm-green-dark">Avantages producteurs</h3>
                                    <ul className="text-sm space-y-1 text-gray-600">
                                        <li className="flex items-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-farm-green mr-2"></div>
                                            Gestion simplifiée des commandes
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-farm-green mr-2"></div>
                                            Visibilité accrue de vos produits
                                        </li>
                                        <li className="flex items-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-farm-green mr-2"></div>
                                            Paiements sécurisés et rapides
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}