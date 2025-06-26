'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getMe } from '@/api/auth';
import { Persona } from '@/types';

const UserContext = createContext<{
  user: Persona | null;
  loading: boolean;
  error: Error | null;
  refreshUser: () => void;
}>({
  user: null,
  loading: true,
  error: null,
  refreshUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    
  const [user, setUser] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshUser = async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch (err) {
      setError(err as Error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser(); // ⬅️ appel au chargement
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error: null, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
