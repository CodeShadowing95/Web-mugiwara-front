'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Farm } from '@/types';
import { toast } from "sonner";

type FarmContextType = {
  selectedFarm: Farm | null;
  setSelectedFarm: (farm: Farm | null) => void;
  farms: Farm[];
  setFarms: (farms: Farm[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  refreshFarms: (forceRefresh?: boolean, isNewFarm?: boolean) => Promise<void>;
};

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export function useFarm() {
  const context = useContext(FarmContext);
  if (!context) {
    toast.error('useFarm doit être utilisé dans FarmProvider');
    return null;
  }
  return context;
}

export function FarmProvider({ children }: { children: ReactNode }) {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshFarms = useCallback(async (forceRefresh: boolean = false, isNewFarm: boolean = false) => {
    if (typeof window === 'undefined') return;

    // Ne pas ignorer le rafraîchissement si c'est une nouvelle ferme
    if (!forceRefresh && !isNewFarm && farms.length > 0) {
      return;
    }

    const token = localStorage.getItem('jwt_token');
    if (!token) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const userInStorage = localStorage.getItem('user');
      const user = userInStorage ? JSON.parse(userInStorage) : null;

      if (!user?.id) {
        toast.error('Informations utilisateur non disponibles');
        return;
      }

      const res = await fetch(`${apiUrl}/api/public/v1/farms/farmer/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        toast.error(errorData?.message || 'Erreur lors de la récupération des fermes');
        return;
      }

      const data = await res.json();

      // Mise à jour du state en fonction des données reçues
      const farmData = data || [];
      setFarms(farmData);

      if (farmData.length > 0) {
        const newFarm = farmData[0];
        setSelectedFarm(newFarm);

        // Si c'est une nouvelle ferme, mettre à jour le cache
        if (isNewFarm) {
          localStorage.setItem('newFarmData', JSON.stringify(newFarm));
        }
      } else {
        setSelectedFarm(null);
        if (isNewFarm) {
          localStorage.removeItem('newFarmData');
        }
      }
    } catch (error) {
      console.error('Erreur refreshFarms:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue lors du chargement des fermes'
      );
      setFarms([]);
      setSelectedFarm(null);
      localStorage.removeItem('newFarmData');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Vérifier d'abord les données en cache
    const cachedFarmData = localStorage.getItem('newFarmData');
    if (cachedFarmData) {
      try {
        const parsedData = JSON.parse(cachedFarmData);
        setSelectedFarm(parsedData);
        setFarms([parsedData]);
      } catch (error) {
        console.error('Erreur lors de la lecture du cache:', error);
        localStorage.removeItem('newFarmData');
      }
    }

    // Rafraîchir les données depuis l'API
    refreshFarms();
  }, [refreshFarms]);

  const value = {
    selectedFarm,
    setSelectedFarm,
    farms,
    setFarms,
    loading,
    setLoading,
    error,
    setError,
    refreshFarms,
  };

  return <FarmContext.Provider value={value}>{children}</FarmContext.Provider>;
}