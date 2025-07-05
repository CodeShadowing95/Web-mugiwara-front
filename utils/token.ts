export const getToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
};

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const clearToken = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
    
    // Supprimer le token des cookies
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};
