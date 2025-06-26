"use client"

import { useState } from "react"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const response = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      })
      if (!response.ok) {
        if (response.status === 400) {
          setError("Erreur ! Des champs sont manquants")
        } else {
          setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
        }
        return
      }
      const res = await response.json()
      localStorage.setItem("jwt_token", res.token)
      // router.push("/")
      window.location.href = "/"
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2] dark:bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-[#e8e1d4] dark:border-zinc-700 p-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-[#5a7052] hover:text-[#3c5a3e] dark:text-emerald-400 dark:hover:text-emerald-300 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
            <h1 className="text-2xl font-bold text-[#3c5a3e] dark:text-white mb-2">Créer un compte</h1>
            <p className="text-[#6b6b6b] dark:text-zinc-400">
              Rejoignez-nous pour découvrir nos produits fermiers
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#3c5a3e] dark:text-zinc-200 mb-2">
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-[#e8e1d4] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[#3c5a3e] dark:text-zinc-200 placeholder-[#a3a3a3] dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#8fb573] dark:focus:ring-emerald-600 focus:border-transparent transition-colors"
                placeholder="Pierre Dupont"
                required
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#3c5a3e] dark:text-zinc-200 mb-2">
                Nom
              </label>
              <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e8e1d4] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[#3c5a3e] dark:text-zinc-200 placeholder-[#a3a3a3] dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#8fb573] dark:focus:ring-emerald-600 focus:border-transparent transition-colors"
                  placeholder="Pierre Dupont"
                  required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#3c5a3e] dark:text-zinc-200 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-[#e8e1d4] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[#3c5a3e] dark:text-zinc-200 placeholder-[#a3a3a3] dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#8fb573] dark:focus:ring-emerald-600 focus:border-transparent transition-colors"
                placeholder="exemple@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#3c5a3e] dark:text-zinc-200 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#e8e1d4] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[#3c5a3e] dark:text-zinc-200 placeholder-[#a3a3a3] dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#8fb573] dark:focus:ring-emerald-600 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a3a3a3] hover:text-[#3c5a3e] dark:text-zinc-500 dark:hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#3c5a3e] dark:text-zinc-200 mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-[#e8e1d4] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[#3c5a3e] dark:text-zinc-200 placeholder-[#a3a3a3] dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#8fb573] dark:focus:ring-emerald-600 focus:border-transparent transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#5a7052] hover:bg-[#3c5a3e] dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#8fb573] dark:focus:ring-emerald-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
            >
              Créer un compte
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#6b6b6b] dark:text-zinc-400">
              Vous avez déjà un compte ?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#3c5a3e] hover:text-[#8fb573] dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}