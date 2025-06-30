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
