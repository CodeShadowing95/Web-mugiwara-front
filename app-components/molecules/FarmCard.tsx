import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Wheat, Sun, Ruler, ShoppingCart, Globe, Phone, Mail } from "lucide-react";
import React from "react";

interface FarmCardProps {
  farm: any;
}

export default function FarmCard({ farm }: FarmCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden pt-0">
      <img
        src={farm.profileImage || "/farm.jpg"}
        alt={farm.name}
        className="rounded-t-xl w-full h-48 object-cover m-0 p-0"
      />
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#3c5a3e]">{farm.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 text-[#5a7052] text-sm items-center">
          <MapPin className="w-4 h-4" /> {farm.city}, {farm.region}
        </div>
        <div className="flex flex-wrap gap-2 text-[#6b6b6b] text-sm items-center">
          <Ruler className="w-4 h-4" /> {farm.farmSize}
          <Sun className="w-4 h-4 ml-2" /> {farm.seasonality}
        </div>
        <div className="flex flex-wrap gap-2 text-[#6b6b6b] text-sm items-center">
          <Wheat className="w-4 h-4" /> {farm.mainProducts?.join(', ')}
        </div>
        <div className="flex flex-wrap gap-2 text-[#6b6b6b] text-sm items-center">
          <ShoppingCart className="w-4 h-4" /> Minimum : {farm.minimumOrder}
        </div>
        <div className="flex flex-wrap gap-2 text-[#6b6b6b] text-xs items-center mt-2">
          <Phone className="w-3 h-3" /> {farm.phone}
          <Mail className="w-3 h-3 ml-2" /> <a href={`mailto:${farm.email}`} className="underline">{farm.email}</a>
          {farm.website && <><Globe className="w-3 h-3 ml-2" /> <a href={farm.website} target="_blank" rel="noopener noreferrer" className="underline">Site</a></>}
        </div>
        <Button asChild className="mt-4 bg-[#8fb573] hover:bg-[#7a9c62] text-white">
          <Link href={`/farm/${farm.id}`}>Voir la ferme</Link>
        </Button>
      </CardContent>
    </Card>
  );
} 