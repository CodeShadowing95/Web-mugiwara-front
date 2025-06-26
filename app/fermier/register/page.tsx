"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, Leaf, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError("Veuillez remplir tous les champs");
            setIsLoading(false);
            return;
        }
        if (!acceptTerms) {
            setError("Veuillez accepter les conditions d'utilisation");
            setIsLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            setIsLoading(false);
            return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        try {
            const response = await fetch(`${apiUrl}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                    farmer: true,
                }),
            })
            if (!response.ok) {
                setIsLoading(false)
                const errorData = await response.json().catch(() => null)
                if (errorData && errorData.error) {
                    setError(errorData.error)
                } else {
                    setError("Erreur lors de l'inscription. Veuillez vérifier vos informations.")
                }
                return
            }
            const res = await response.json()
            localStorage.setItem("jwt_token", res.token)
            setSuccess("Inscription réussie ! Redirection...")
            setTimeout(() => {
                window.location.href = "/"
            }, 1200)
        } catch (err) {
            setError("Une erreur est survenue. Veuillez réessayer plus tard.")
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-farm-beige-light flex flex-col lg:flex-row">
            {/* Left side - Hero Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-farm-green p-8 flex-col justify-center items-center">
                <div className="max-w-md text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                        <Leaf className="w-10 h-10 text-farm-green" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-white">Rejoignez CocotteConnect</h1>
                    <p className="text-xl text-white/90 mb-8">
                        Créez votre compte et accédez à des produits frais directement des producteurs locaux
                    </p>

                    <div className="space-y-4 text-left bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                        <h3 className="text-white font-medium text-lg mb-2">Pourquoi nous rejoindre ?</h3>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <Check className="w-4 h-4 text-farm-green" />
                            </div>
                            <span className="text-white">Produits frais et de saison</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <Check className="w-4 h-4 text-farm-green" />
                            </div>
                            <span className="text-white">Soutien aux producteurs locaux</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <Check className="w-4 h-4 text-farm-green" />
                            </div>
                            <span className="text-white">Livraison à domicile</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <Check className="w-4 h-4 text-farm-green" />
                            </div>
                            <span className="text-white">Traçabilité des produits</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="space-y-1 pb-6">
                            <div className="flex items-center justify-center mb-6 lg:hidden">
                                <div className="w-16 h-16 rounded-full bg-farm-green flex items-center justify-center">
                                    <Leaf className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-center text-farm-green-dark">Créer un compte</CardTitle>
                            <CardDescription className="text-center text-gray-600">
                                Inscrivez-vous et faites valoir vos produits
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-sm font-medium text-farm-green-dark">
                                            Prénom
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="firstName"
                                                type="text"
                                                placeholder="Jean"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="pl-10 h-12 border-gray-200"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-sm font-medium text-farm-green-dark">
                                            Nom
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="lastName"
                                                type="text"
                                                placeholder="Dupont"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="pl-10 h-12 border-gray-200"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-farm-green-dark">
                                        Adresse email
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="votre@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 h-12 border-gray-200"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-farm-green-dark">
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
                                            className="pl-10 pr-10 h-12 border-gray-200"
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
                                    <p className="text-xs text-gray-500 mt-1">
                                        Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-farm-green-dark">
                                        Confirmer le mot de passe
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="pl-10 pr-10 h-12 border-gray-200"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-2 pt-2">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        className="rounded border-gray-300 text-farm-green mt-1"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                        required
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-600">
                                        J'accepte les <Link href="/" className="text-farm-green hover:underline">conditions d'utilisation</Link> et la <Link href="/" className="text-farm-green hover:underline">politique de confidentialité</Link>
                                    </label>
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center">{error}</div>
                                )}
                                {success && (
                                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm text-center">{success}</div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-white font-medium bg-farm-green hover:bg-farm-green-dark mt-2"
                                    disabled={isLoading || !acceptTerms}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Création du compte...</span>
                                        </div>
                                    ) : (
                                        "Créer mon compte"
                                    )}
                                </Button>
                            </form>

                            <div className="text-center">
                                <span className="text-gray-600">Déjà un compte ? </span>
                                <Link href="/fermier/login" className="font-medium hover:underline text-farm-green">
                                    Se connecter
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        En créant un compte, vous acceptez de recevoir des emails de CocotteConnect concernant nos produits et
                        services. Vous pouvez vous désinscrire à tout moment.
                    </div>
                </div>
            </div>
        </div>
    )
}
