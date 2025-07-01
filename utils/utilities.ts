export const genRandKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getAvatarInitials(name: string): string {
  const ignored = ['de', 'du', 'des', 'la', 'le', 'les', "d'", "l'"];

  const parts = name
    .toLowerCase()
    .split(' ')
    .filter(w => w && !ignored.includes(w));

  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();

  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// Calcule la distance en kilomètres entre deux points GPS
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (x: number) => x * Math.PI / 180;
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
