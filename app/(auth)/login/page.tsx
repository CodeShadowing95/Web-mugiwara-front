"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, Leaf, Sprout, Apple, Wheat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

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
        window.location.href = "/"
      }, 1200)
    } catch (err) {
      setError("Erreur de connexion. Veuillez réessayer.")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Section */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ backgroundColor: "var(--farm-beige)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--farm-green)] to-[var(--farm-green-dark)] opacity-10"></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 animate-float">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--farm-green-light)" }}
          >
            <Leaf className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: "1s" }}>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--farm-orange)" }}
          >
            <Apple className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="absolute bottom-10 left-32 animate-float" style={{ animationDelay: "2s" }}>
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--farm-green)" }}
          >
            <Sprout className="w-7 h-7 text-white" />
          </div>
        </div>

        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: "0.5s" }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--farm-orange-light)" }}
          >
            <Wheat className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col justify-center items-center w-full p-12 relative z-10">
          <div className="text-center animate-slide-in">
            <div className="mb-8">
              <div
                className="flex items-center justify-center grow-animation"
              >
                <img src={"./logo/coco-logo.png"} alt="Marché Fermier Logo" className="w-60" />
              </div>
              <h1 className="text-4xl mt-10 font-bold mb-4" style={{ color: "var(--farm-green-dark)" }}>
                Connexion
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-md">
                Connectez-vous directement avec les producteurs locaux pour des produits frais et de qualité
              </p>
            </div>

            <div className="space-y-4 text-left max-w-sm">
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--farm-green-light)" }}
                >
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Produits frais et locaux</span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--farm-orange)" }}
                >
                  <Apple className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Direct producteur</span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--farm-green)" }}
                >
                  <Sprout className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Agriculture durable</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-8">
              <div className="flex items-center justify-center mb-6 lg:hidden">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--farm-green)" }}
                >
                  <Leaf className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center" style={{ color: "var(--farm-green-dark)" }}>
                Bon retour !
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Connectez-vous à votre compte CocotteConnect
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium" style={{ color: "var(--farm-green-dark)" }}>
                    Adresse email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
                      Se souvenir de moi
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
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
                  className="w-full h-12 text-white font-medium transition-all duration-200 hover:shadow-lg hover:bg-[var(--farm-green-dark)]"
                  style={{
                    backgroundColor: "var(--farm-green)",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Connexion...</span>
                    </div>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>

              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Ou continuer avec</span>
                </div>
              </div> */}

              {/* <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 border-gray-200 hover:bg-gray-50">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="h-12 border-gray-200 hover:bg-gray-50">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div> */}

              <div className="text-center">
                <span className="text-gray-600">Pas encore de compte ? </span>
                <Link href="/register" className="font-medium hover:underline" style={{ color: "var(--farm-green)" }}>
                  Créer un compte
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}