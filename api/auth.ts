import { getToken, setToken } from '@/utils/token';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const login = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/login_check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Erreur de connexion');
  }

  const data = await res.json();
  setToken(data.token);
  return data;
};

// export const register = async (payload: {
//   email: string;
//   password: string;
//   name: string;
//   // ... autres infos de fermier
// }) => {
//   const res = await fetch(`${API_URL}/register`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) {
//     const error = await res.json().catch(() => ({}));
//     throw new Error(error.message || 'Erreur d’inscription');
//   }

//   return res.json();
// };

export const getMe = async () => {
  const token = getToken();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
  const res = await fetch(`${API_URL}/api/current-user`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Non connecté');

  return res.json();
};