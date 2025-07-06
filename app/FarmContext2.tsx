'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Farm } from '@/types';
import { toast } from "sonner";

type FarmContext2Type = {
  selectedFarm: Farm | null;
  setSelectedFarm: (farm: Farm | null) => void;
  farms: Farm[];
  setFarms: (farms: Farm[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  refreshNewFarm: () => Promise<void>;
};

const FarmContext2 = createContext<FarmContext2Type | undefined>(undefined);

export function useFarm2() {
  const context = useContext(FarmContext2);
  if (!context) {
    toast.error('useFarm2 doit être utilisé dans FarmProvider2');
    return null;
  }
  return context;
}

export function FarmProvider2({ children }: { children: ReactNode }) {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const refreshNewFarm = useCallback(async () => {
    if (!isClient) return;

    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const token = localStorage.getItem('jwt_token');
      const userInStorage = localStorage.getItem('user');
      const user = userInStorage ? JSON.parse(userInStorage) : null;

      if (!token || !user) {
        throw new Error('Non authentifié');
      }

      const response = await fetch(`${apiUrl}/api/public/v1/farms/farmer/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des fermes');
      }

      const data = await response.json();
      setFarms(data);
      localStorage.setItem('farms', JSON.stringify(data));

      // Si aucune ferme n'est sélectionnée et qu'il y a des fermes disponibles, sélectionner la première
      if (data.length > 0 && !selectedFarm) {
        setSelectedFarm(data[0]);
        localStorage.setItem('selectedFarm', JSON.stringify(data[0]));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      toast.error('Erreur lors de la récupération des fermes');
    } finally {
      setLoading(false);
    }
  }, [isClient]); // Supprimer selectedFarm des dépendances

  // Charger les données initiales
  useEffect(() => {
    if (!isClient) return;

    const loadInitialData = async () => {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        setError('Veuillez vous connecter pour accéder à vos fermes');
        return;
      }

      const storedFarms = localStorage.getItem('farms');
      const storedSelectedFarm = localStorage.getItem('selectedFarm');

      if (storedFarms) {
        try {
          const parsedFarms = JSON.parse(storedFarms);
          setFarms(parsedFarms);

          if (storedSelectedFarm) {
            const parsedSelectedFarm = JSON.parse(storedSelectedFarm);
            setSelectedFarm(parsedSelectedFarm);
          }
        } catch (error) {
          console.error('Erreur lors de la lecture des données initiales:', error);
          localStorage.removeItem('farms');
          localStorage.removeItem('selectedFarm');
        }
      }
      await refreshNewFarm();
    };

    loadInitialData();
  }, [refreshNewFarm, isClient]);

  // Gérer la sélection de ferme quand farms change
  useEffect(() => {
    if (farms.length > 0 && !selectedFarm) {
      setSelectedFarm(farms[0]);
    } else if (farms.length === 0) {
      setSelectedFarm(null);
    }
  }, [farms, selectedFarm]);

  const value = {
    selectedFarm,
    setSelectedFarm,
    farms,
    setFarms,
    loading,
    setLoading,
    error,
    setError,
    refreshNewFarm
  };

  return (
    <FarmContext2.Provider value={value}>
      {children}
    </FarmContext2.Provider>
  );
}