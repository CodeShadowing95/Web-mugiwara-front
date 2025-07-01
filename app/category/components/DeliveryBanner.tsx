import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

const DeliveryBanner: React.FC = () => (
  <div className="bg-[#3c5a3e] text-white py-4 mt-8">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Truck size={24} className="mr-3" />
          <div>
            <p className="font-medium">
              Livraison gratuite à partir de 35€ d'achat
            </p>
            <p className="text-sm text-white/80">
              Livraison en 24-48h ou retrait en point relais
            </p>
          </div>
        </div>
        <Button className="bg-white text-[#3c5a3e] hover:bg-[#f7f4eb]">
          Voir les conditions
        </Button>
      </div>
    </div>
  </div>
);

export default DeliveryBanner; 