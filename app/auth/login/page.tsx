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
              <div className="mx-auto mb-6 rounded-2xl flex items-center justify-center grow-animation">
                <img
                  src="/logo/coco-logo.png"
                  alt="Marché Fermier Logo"
                  width={400}
                  height={400}
                  className="w-52"
                  loading="eager"
                />
              </div>
              {/* <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--farm-green-dark)" }}>
                CocotteConnect
              </h1> */}
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

              <div className="text-center">
                <span className="text-gray-600">Pas encore de compte ? </span>
                <Link href="/auth/register" className="font-medium hover:underline" style={{ color: "var(--farm-green)" }}>
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