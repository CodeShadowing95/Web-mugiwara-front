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
  const [showBecomeFarmerModal, setShowBecomeFarmerModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
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
      setHasFarms(true)
    } else {
      setHasFarms(false)
    }
  }, [farms]);

  useEffect(() => {
    if (!isAuthPage) {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const userRoles = user?.roles;
      if (!userRoles || !Array.isArray(userRoles) || !userRoles.includes("ROLE_FARMER")) {
        setShowBecomeFarmerModal(true);
      } else {
        setShowBecomeFarmerModal(false);
      }
      // const roles = Array.isArray(user.roles) ? user.roles : [];
      // console.log("Roles:", roles);
      // if (!roles.includes("ROLE_FARMER")) {
      //   setShowBecomeFarmerModal(true);
      // } else {
      //   setShowBecomeFarmerModal(false);
      // }
    }
  }, [isAuthPage]);

  // const handleBecomeFarmer = async () => {
  //   setLoading(true);
  //   setMessage(null);
  //   setColor("success");
  //   try {
  //     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  //     const token = localStorage.getItem("jwt_token");
  //     const res = await fetch(`${apiUrl}/api/become-farmer`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (res.ok) {
  //       setMessage("Vous êtes maintenant fermier ! Commencez à ajouter votre première ferme.");
  //       setColor("success");
  //       await refreshUser(true);
  //     } else {
  //       let errorMsg = "Erreur lors de la demande. Veuillez réessayer.";
  //       setColor("danger");
  //       try {
  //         const data = await res.json();
  //         if (res.status === 401) {
  //           errorMsg = "Votre session a expiré. Veuillez vous reconnecter.";
  //           setMessage(errorMsg);
  //           setTimeout(() => {
  //             window.location.href = "/fermier/login";
  //           }, 1200);
  //           return;
  //         } else if (data.message) {
  //           errorMsg = data.message;
  //         }
  //       } catch {
  //         setMessage(errorMsg);
  //         setTimeout(() => window.location.reload(), 1500);
  //       }
  //     }
  //   } catch (e) {
  //     setMessage("Erreur réseau. Veuillez réessayer.");
  //     setColor("danger");
  //     setTimeout(() => window.location.reload(), 1500);
  //   } finally {
  //     setLoading(false);
  //     setShowBecomeFarmerModal(false);
  //   }
  // };

  let colorClass = "bg-green-100 text-green-800";
  if (color === "danger") {
    colorClass = "bg-red-100 text-red-800";
  }

  return (
    <>
      {/* <Modal
        isOpen={showBecomeFarmerModal}
        onClose={() => setShowBecomeFarmerModal(false)}
        onConfirm={handleBecomeFarmer}
        title="Confirmation"
        confirmText={loading ? "En cours..." : "Confirmer"}
      >
        Vous devez devenir fermier pour accéder à cet espace. Continuer ?
      </Modal>
      {message && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow z-50 ${colorClass}`}
        >
          {message}
        </div>
      )} */}

      {hasFarms && (
        <Toast
          title="Et si on cherchait Larry ? 😆"
          description="Ravi de vous revoir! Vous pouvez ajouter des fermes à partir de votre espace personnel."
          className="bg-orange-100"
          icon={<CheckCircle className="w-6 h-6 text-orange-500" />}
          actionLabel="OK"
        />
        // <Toast
        //   title="Ferme ajoutée"
        //   description="Une nouvelle ferme a été créée avec succès"
        //   className="bg-green-100"
        //   icon={<CheckCircle className="w-6 h-6 text-emerald-500" />}
        //   actionLabel="OK"
        // />
      )}

      {!isAuthPage && <Sidebar hasFarms={hasFarms} />}
      <div className={`flex-1 flex flex-col w-full ${isAuthPage ? '' : 'lg:w-[calc(100%-16rem)'} ]`}>
        <div className={`${!isAuthPage && 'ml-64'}`}>
          {!isAuthPage && hasFarms && <Navbar />}
          {children}
        </div>
      </div>
    </>
  )
}

export default FermierLayout