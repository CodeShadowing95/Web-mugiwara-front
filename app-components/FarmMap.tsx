"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Correction du marker invisible sur Next.js
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src || markerIcon2x,
  iconUrl: markerIcon.src || markerIcon,
  shadowUrl: markerShadow.src || markerShadow,
});

interface FarmMapProps {
  farms: { id: number; name: string; coordinates: { lat: string; lng: string } }[];
  center?: { lat: number; lng: number };
  zoom?: number;
}

export default function FarmMap({ farms = [], center = { lat: 48.8588443, lng: 2.2943506 }, zoom = 6 }: FarmMapProps) {
  return (
    <div style={{ height: 400, width: '100%', zIndex: 1, position: 'relative' }} className="z-0">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{ height: '100%', width: '100%', zIndex: 1, position: 'relative' }}
        className="leaflet-container z-0"
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {Array.isArray(farms) && farms.length > 0 && farms.map((farm) => (
          <Marker
            key={farm.id}
            position={[parseFloat(farm.coordinates.lat), parseFloat(farm.coordinates.lng)]}
          >
            <Popup>
              <div className="text-sm font-semibold">{farm.name}</div>
              <a href={`/farm/${farm.id}`} className="text-blue-600 underline">Voir la ferme</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 