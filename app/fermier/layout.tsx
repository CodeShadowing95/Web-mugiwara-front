"use client";

import React, { useEffect, useState } from 'react'
import { Navbar, Sidebar } from '@/app-components/Farmer'
import { usePathname } from "next/navigation";
import Toast from '@/app-components/Toast';
import { CheckCircle } from 'lucide-react';

const FermierLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/fermier/login") || pathname?.startsWith("/fermier/register");
  const [hasFarms, setHasFarms] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const data = localStorage.getItem("newFarmData")
        if (data) {
          const farms = JSON.parse(data)
          if (Object.keys(farms).length > 0) {
            setHasFarms(true)

            // Optionnel : supprimer la donnée après affichage
            // localStorage.removeItem("newFarmData")
          }
        }
      } catch (error) {
        console.error("Erreur de lecture de localStorage newFarmData", error)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-farm-beige-light flex relative">
      {hasFarms && (
        <Toast 
          title="Ferme ajoutée"
          description="Une nouvelle ferme a été créée avec succès"
          className="bg-green-100" 
          icon={<CheckCircle className="w-6 h-6 text-emerald-500" />} 
          actionLabel="OK" 
        />
      )}

      {!isAuthPage && <Sidebar hasFarms={hasFarms} />}
      <div className="flex-1 flex flex-col w-full lg:w-[calc(100%-16rem)]">
        <div className={`${!isAuthPage && 'ml-64'}`}>
          {!isAuthPage && hasFarms && <Navbar />}
          {children}
        </div>
      </div>
    </div>
  )
}

export default FermierLayout