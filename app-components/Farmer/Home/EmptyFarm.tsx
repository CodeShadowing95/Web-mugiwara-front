import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const EmptyFarm = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] p-4 bg-gradient-to-b from-transparent to-farm-beige-light/20">
            <div className="w-80 h-80 mb-8 relative animate-float">
                <img
                    src="/farm2.png"
                    alt="Illustration d'une ferme"
                    className="w-full h-full object-contain rounded-2xl opacity-90 drop-shadow-xl"
                    loading="eager"
                />
            </div>
            <h2 className="text-3xl font-bold text-gray-500 mb-4 text-center tracking-tight">
                Bienvenue dans votre espace fermier
            </h2>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-md leading-relaxed">
                Pour commencer à gérer vos produits et développer votre activité, créez votre première ferme en quelques clics.
            </p>
            <button
                onClick={() => router.push('/fermier/add-farm')}
                className="group px-6 py-3 bg-[var(--farm-green)] text-white rounded-lg font-medium hover:bg-[var(--farm-green-dark)] hover:scale-105 transform transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--farm-green)] focus:ring-offset-2"
                aria-label="Créer une nouvelle ferme"
            >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Créer ma ferme
            </button>
        </div>
    )
}

export default EmptyFarm