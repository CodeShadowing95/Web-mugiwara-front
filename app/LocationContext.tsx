import React, { createContext, useContext, useState, ReactNode } from "react";

interface LocationContextType {
  city: string;
  lat: number | null;
  lng: number | null;
  setLocation: (city: string, lat: number, lng: number) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string>("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const setLocation = (city: string, lat: number, lng: number) => {
    setCity(city);
    setLat(lat);
    setLng(lng);
  };

  return (
    <LocationContext.Provider value={{ city, lat, lng, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation doit être utilisé dans un LocationProvider");
  }
  return context;
} 