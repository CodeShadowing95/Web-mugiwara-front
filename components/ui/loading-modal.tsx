"use client"

import type React from "react"
import { X, Check, AlertCircle, Clock, Leaf } from "lucide-react"
import { FarmLoader } from "@/components/ui/farm-loader"

interface LoadingStep {
  id: string
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  variant: "tractor" | "leaf" | "apple" | "carrot" | "wheat"
  status: "pending" | "loading" | "success" | "error"
  data?: any
  error?: string
}

interface LoadingModalProps {
  isOpen: boolean
  onClose: () => void
  steps: LoadingStep[]
  currentStepIndex: number
  onRetry?: (stepIndex: number) => void
}

export function LoadingModal({ isOpen, onClose, steps, currentStepIndex, onRetry }: LoadingModalProps) {
  if (!isOpen) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "loading":
        return "border-farm-orange bg-[var(--farm-orange)]/5"
      case "success":
        return "border-farm-green bg-[var(--farm-green)]/5"
      case "error":
        return "border-red-500 bg-red-50"
      default:
        return "border-gray-200 bg-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <Check className="w-4 h-4 text-farm-green" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "loading":
        return <div className="w-4 h-4 border-2 border-farm-orange border-t-transparent rounded-full animate-spin" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header du modal */}
        <div className="bg-gradient-to-r from-farm-green to-farm-green-dark p-4 text-gray-500 relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-500/80 hover:text-gray-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-4 py-2">
            <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center shadow-inner transform hover:scale-105 transition-all duration-300">
              <Leaf className="w-5 h-5 text-farm-green animate-pulse" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-farm-green tracking-wide">
                CocotteConnect
              </h2>
              <p className="text-farm-green/80 text-sm font-medium">
                Préparation de votre espace fermier...
              </p>
            </div>
          </div>
        </div>

        {/* Contenu du modal avec grid 2 colonnes */}
        <div className="p-6">
          {/* Étapes de chargement en grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              const isCurrentStep = currentStepIndex === index

              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-300 ${getStatusColor(step.status)} ${
                    isCurrentStep ? "ring-1 ring-farm-orange scale-[1.02]" : ""
                  }`}
                >
                  <div className="flex-shrink-0">
                    {step.status === "loading" ? (
                      <FarmLoader size="xs" variant={step.variant} />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[var(--farm-green)]/10 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-farm-green-dark" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium truncate">{step.label}</h3>
                      {getStatusIcon(step.status)}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{step.description}</p>

                    {/* Message de succès */}
                    {step.status === "success" && step.data && (
                      <div className="mt-2 p-2 bg-green-50 rounded-md">
                        <p className="text-xs text-green-700">{step.data.message || "Données chargées avec succès"}</p>
                      </div>
                    )}

                    {/* Message d'erreur avec bouton retry */}
                    {step.status === "error" && (
                      <div className="mt-2">
                        <div className="p-2 bg-red-50 rounded-md mb-2">
                          <p className="text-xs text-red-700">{step.error || "Une erreur est survenue"}</p>
                        </div>
                        {onRetry && (
                          <button
                            onClick={() => onRetry(index)}
                            className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors"
                          >
                            Réessayer
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer du modal */}
        <div className="bg-gray-50 px-4 py-3 text-center">
          <p className="text-xs text-gray-600">Préparation de votre espace fermier...</p>
        </div>
      </div>
    </div>
  )
}
