import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocation } from "@/app/LocationContext";

interface MapSearchProps {
  onSelect: (city: string, lat: number, lon: number) => void;
}

const DEFAULT_POSITION = { lat: 45.75, lon: 4.85 }; // Lyon par défaut

function LocationMarker({ onSelect }: { onSelect: (city: string, lat: number, lon: number) => void }) {
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(null);

  useMapEvents({
    click(e) {
      setPosition({ lat: e.latlng.lat, lon: e.latlng.lng });
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`)
        .then(res => res.json())
        .then(data => {
          const city = data.address?.city || data.address?.town || data.address?.village || '';
          onSelect(city, e.latlng.lat, e.latlng.lng);
        });
    },
  });

  return position ? <Marker position={[position.lat, position.lon]} /> : null;
}

const MapSearch: React.FC<MapSearchProps> = ({ onSelect }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState([DEFAULT_POSITION.lat, DEFAULT_POSITION.lon]);
  const { setLocation } = useLocation();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length < 3) {
      setSuggestions([]);
      return;
    }
    const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${e.target.value}&country=France&format=json&addressdetails=1&limit=5`);
    const data = await res.json();
    setSuggestions(data);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setMapCenter([parseFloat(suggestion.lat), parseFloat(suggestion.lon)]);
    setSuggestions([]);
    setSearch(suggestion.display_name);
    const city = suggestion.address?.city || suggestion.address?.town || suggestion.address?.village || '';
    onSelect(city, parseFloat(suggestion.lat), parseFloat(suggestion.lon));
    setLocation(city, parseFloat(suggestion.lat), parseFloat(suggestion.lon));
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Rechercher une ville ou un code postal"
        className="w-full p-2 border rounded mb-2"
      />
      {suggestions.length > 0 && (
        <ul className="bg-white border rounded shadow max-h-40 overflow-y-auto mb-2">
          {suggestions.map((s, i) => {
            const city = s.address?.city || s.address?.town || s.address?.village || '';
            const postcode = s.address?.postcode || '';
            return (
              <li key={i} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick(s)}>
                {city}{postcode ? ` (${postcode})` : ''}
              </li>
            );
          })}
        </ul>
      )}
      <div style={{ height: 300, width: '100%' }}>
        <MapContainer center={mapCenter as [number, number]} zoom={11} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onSelect={onSelect} />
        </MapContainer>
      </div>
      <p className="text-xs text-gray-500 mt-2">Cliquez sur la carte ou recherchez une ville/code postal.</p>
    </div>
  );
};

export default MapSearch;
