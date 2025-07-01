"use client";
import { useEffect, useState } from "react";
import FarmMap from "@/app-components/FarmMap";
import { getFarms } from "@/lib/farm";
import Breadcrumb from "@/app-components/Breadcrumb";
import { Home, MapPin } from "lucide-react";

export default function FarmsMapPage() {
  const [farms, setFarms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // Centre de la France par défaut
  const defaultCenter = { lat: 46.603354, lng: 1.888334 };

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/", icon: <Home size={14} className="mr-1" /> },
          { label: "Fermes", href: "/farms" },
          { label: "Carte des fermes", icon: <MapPin size={14} className="mr-1" /> }
        ]}
        className="max-w-7xl mx-auto px-4 md:px-8 py-3 text-sm text-[#5a7052] flex items-center"
      />
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <h1 className="text-3xl font-bold text-[#3c5a3e] mb-8 flex items-center gap-2">
          <MapPin className="w-7 h-7 text-[#8fb573]" /> Carte des fermes
        </h1>
        {loading ? (
          <div className="text-center text-[#5a7052]">Chargement de la carte...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : farms.length === 0 ? (
          <div className="text-center text-[#5a7052]">Aucune ferme trouvée.</div>
        ) : (
          <FarmMap farms={farms.filter(f => f.coordinates && f.coordinates.lat && f.coordinates.lng)} center={defaultCenter} zoom={6} />
        )}
      </main>
    </div>
  );
} 