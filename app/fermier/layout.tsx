"use client";

import React, { useEffect, useState } from 'react'
import { Navbar, Sidebar } from '@/app-components/Farmer'
import { usePathname } from "next/navigation";
import Toast from '@/app-components/Toast';
import { CheckCircle } from 'lucide-react';
import Modal from '@/app-components/Modal';
import { useUser } from "@/app/UserContext";
import { useFarm2 } from '../FarmContext2';

const FermierLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/fermier/login") || pathname?.startsWith("/fermier/register");
  const [hasFarms, setHasFarms] = useState(false);
  const [color, setColor] = useState<string>("success");
  const userContext = useUser()
  const farm2Context = useFarm2()

  if (!userContext) {
    return <div>Erreur : Contexte utilisateur non disponible</div>
  }

  if (!farm2Context) {
    return <div>Erreur : Contexte Farm2 non disponible</div>
  }
  
  const { refreshUser } = userContext;
  const { farms } = farm2Context;

  useEffect(() => {
    if (farms && farms.length > 0) {
      setHasFarms(true);
    }
  }, [farms]);

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar hasFarms={hasFarms} />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        {hasFarms && <Navbar />}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  )
}

export default FermierLayout