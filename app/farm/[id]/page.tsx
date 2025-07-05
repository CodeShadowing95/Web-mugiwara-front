import { getFarmById } from '@/lib/farm';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone, Mail, Globe, MapPin, Ruler, Wheat, SunIcon, Truck, CheckCircle, Info, GalleryHorizontal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import FarmMap from "@/app-components/FarmMap";
import Breadcrumb from "@/app-components/Breadcrumb";
import ProductImage from "@/app-components/atoms/ProductImage";
import ProductList from '../../category/components/ProductList';

export default async function FarmPage({ params, searchParams }: { params: { id: string }, searchParams: { q?: string } }) {
  const farm = await getFarmById(params.id);
  if (!farm) return notFound();
  const farmData = farm.farm || {};
  const products = farm.products || [];

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <main className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Fil d'Ariane */}
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Fermes", href: "/farms" },
            { label: farmData.name || "Ferme" }
          ]}
        />
        {/* Carte principale infos générales */}
        <Card className="flex flex-col md:flex-row gap-8">
          <div className="mx-10 md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-xs aspect-square overflow-hidden rounded-xl bg-white flex items-center justify-center">
              <ProductImage
                src={farmData.profileImage || "/imgs/farm.jpg"}
                alt={farmData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2 justify-between">
            <CardHeader className="p-0 pb-2">
              <CardTitle className="text-3xl font-bold text-[#3c5a3e] flex items-center gap-2">
                <Info className="w-7 h-7 text-[#8fb573]" /> {farmData.name}
              </CardTitle>
              <CardDescription className="text-[#5a7052] flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {farmData.address}, {farmData.zipCode} {farmData.city}
              </CardDescription>
            </CardHeader>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="flex items-center gap-2 text-[#6b6b6b]"><SunIcon className="w-4 h-4" /> Région : {farmData.region}</span>
              <span className="flex items-center gap-2 text-[#6b6b6b]"><Wheat className="w-4 h-4" /> Type : {farmData.farmType}</span>
              <span className="flex items-center gap-2 text-[#6b6b6b]"><CheckCircle className="w-4 h-4" /> Certifications : {farmData.certifications?.join(', ') || 'Aucune'}</span>
              <span className="flex items-center gap-2 text-[#6b6b6b]"><Ruler className="w-4 h-4" /> Taille : {farmData.farmSize}</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="flex items-center gap-2 text-[#6b6b6b]"><Wheat className="w-4 h-4" /> Produits principaux : {farmData.mainProducts?.join(', ')}</span>
              <span className="flex items-center gap-2 text-[#6b6b6b]"><SunIcon className="w-4 h-4" /> Saisonnalité : {farmData.seasonality}</span>
            </div>
          </div>
        </Card>
        {/* Bloc séparé pour les infos de contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Phone className="w-5 h-5 text-[#8fb573]" /> Contact</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> {farmData.phone}</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> <a href={`mailto:${farmData.email}`} className="text-[#8fb573] underline">{farmData.email}</a></span>
            {farmData.website && (
              <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> <a href={farmData.website} target="_blank" rel="noopener noreferrer" className="text-[#8fb573] underline">{farmData.website}</a></span>
            )}
          </CardContent>
        </Card>
        {/* Carte description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Info className="w-5 h-5 text-[#8fb573]" /> Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#6b6b6b]">{farmData.description}</p>
          </CardContent>
        </Card>
        {/* Carte galerie d'images */}
        {farmData.galleryImages && farmData.galleryImages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><GalleryHorizontal className="w-5 h-5 text-[#8fb573]" /> Galerie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 overflow-x-auto">
                {farmData.galleryImages.map((img: string, idx: number) => (
                  <img key={idx} src={img} alt={`Galerie ${idx + 1}`} className="rounded-lg h-40 object-cover" />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        {/* Carte Map localisation */}
        {farmData.coordinates?.lat && farmData.coordinates?.lng && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5 text-[#8fb573]" /> Localisation de la ferme</CardTitle>
            </CardHeader>
            <CardContent>
              <FarmMap farms={[{ id: farmData.id, name: farmData.name, coordinates: { lat: farmData.coordinates.lat, lng: farmData.coordinates.lng } }]} center={{ lat: Number(farmData.coordinates.lat), lng: Number(farmData.coordinates.lng) }} zoom={13} />
            </CardContent>
          </Card>
        )}
        {/* Carte infos pratiques type FAQ/accordéon (simulé) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Truck className="w-5 h-5 text-[#8fb573]" /> Infos pratiques</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Zones de livraison : <span className="ml-1">{farmData.deliveryZones?.join(', ')}</span></div>
            <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Méthodes de livraison : <span className="ml-1">{farmData.deliveryMethods?.join(', ')}</span></div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Commande minimum : <span className="ml-1">{farmData.minimumOrder}</span></div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Coordonnées GPS : <span className="ml-1">{farmData.coordinates?.lat}, {farmData.coordinates?.lng}</span></div>
          </CardContent>
        </Card>
        {/* Section produits */}
        <section id="products">
          <ProductList products={products} loading={false} error={products.length === 0 ? 'Aucun produit disponible pour cette ferme.' : ''} title="Produits de la ferme" />
        </section>
      </main>
    </div>
  );
} 