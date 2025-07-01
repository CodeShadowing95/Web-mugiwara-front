import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface UserContextType {
  currentUser: any;
  refreshUser: (forceRefresh?: boolean) => Promise<void>;
  setCurrentUser: (user: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser doit être utilisé dans UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const refreshUser = useCallback(async (forceRefresh: boolean = false) => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("jwt_token");
    const userInStorage = localStorage.getItem("user");
    if (!forceRefresh && userInStorage) {
      try {
        setCurrentUser(JSON.parse(userInStorage));
        return;
      } catch {
        localStorage.removeItem("user");
      }
    }
    if (token) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/current-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          console.error('Erreur lors de la récupération du profil:', {
            status: res.status,
            statusText: res.statusText,
            error: errorData
          });
          setCurrentUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("jwt_token");
          throw new Error(errorData?.message || `Erreur HTTP: ${res.status}`);
        }
        
        const user = await res.json();
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        setCurrentUser(null);
        localStorage.removeItem("user");
      }
    } else {
      setCurrentUser(null);
      localStorage.removeItem("user");
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <UserContext.Provider value={{ currentUser, refreshUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
