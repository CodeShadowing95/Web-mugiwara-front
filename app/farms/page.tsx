"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Breadcrumb from "@/app-components/Breadcrumb";
import { Home, Tractor } from "lucide-react";
import { getFarms } from "@/lib/farm";
import FarmCard from "@/app-components/molecules/FarmCard";
import { useLocation } from "@/app/LocationContext";
import { haversineDistance } from "@/utils/utilities";

export default function FarmsPage() {
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { lat: userLat, lng: userLng, city } = useLocation();

  useEffect(() => {
    const fetchFarms = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getFarms();
        setFarms(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Erreur lors du chargement des fermes.");
      } finally {
        setLoading(false);
      }
    };
    fetchFarms();
  }, []);

  // Trie les fermes par distance si position définie
  const sortedFarms = farms && userLat !== null && userLng !== null
    ? [...farms].map(farm => {
        let distance = null;
        if (farm.coordinates && farm.coordinates.lat && farm.coordinates.lng) {
          distance = haversineDistance(
            userLat,
            userLng,
            parseFloat(farm.coordinates.lat),
            parseFloat(farm.coordinates.lng)
          );
        }
        return { ...farm, distance };
      })
      .sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      })
    : farms;

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/", icon: <Home size={14} className="mr-1" /> },
          { label: "Fermes" }
        ]}
        className="max-w-7xl mx-auto px-4 md:px-8 py-3 text-sm text-[#5a7052] flex items-center"
      />
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <h1 className="text-3xl font-bold text-[#3c5a3e] mb-8 flex items-center gap-2"><Tractor className="w-7 h-7 text-[#8fb573]" /> Toutes les fermes</h1>
        {loading ? (
          <div className="text-center text-[#5a7052]">Chargement...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : farms.length === 0 ? (
          <div className="text-center text-[#5a7052]">Aucune ferme trouvée.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFarms.map((farm: any) => (
              <div key={farm.id}>
                <FarmCard farm={farm} />
                {userLat !== null && userLng !== null && farm.distance !== null && (
                  <div className="text-xs text-[#8fb573] mt-1">{farm.distance.toFixed(1)} km</div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 