import { toast } from "sonner";

export const getCategories = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const url = `${apiUrl}/api/public/v1/product-categories`;
    const options = { 
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            toast.error(`Erreur serveur: ${response.status}. Veuillez rafraichir la page`);
            return null;
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            toast.error("La réponse du serveur n'est pas au format JSON");
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        toast.error('Impossible de récupérer les catégories.');
        return null;
    }
}

export const getCategoryById = async (categoryId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/api/public/v1/product-category/${categoryId}`;
    const options = { method: 'GET' };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch category by ID:', error);
        toast.error('Impossible de récupérer la catégorie.');
        return null;
    }
}

export const getProductsByCategory = async (categoryId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/api/public/v1/product-category/${categoryId}/products`;
    const options = { 
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            toast.error(`Erreur serveur: ${response.status}. Veuillez rafraichir la page`);
            return null;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            toast.error("La réponse du serveur n'est pas au format JSON");
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch products by category:', error);
        toast.error('Impossible de récupérer les produits de la catégorie.');
        return null;
    }
}

export const getCategoryChildren = async (categoryId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/api/public/v1/product-category/${categoryId}/children`;
    const options = { 
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            toast.error(`Erreur serveur: ${response.status}. Veuillez rafraichir la page`);
            return null;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            toast.error("La réponse du serveur n'est pas au format JSON");
            return null;
        }

        const data = await response.json();
        if (!data) return [];
        if (Array.isArray(data)) return data;
        return [data];
    } catch (error) {
        console.error('Failed to fetch category children:', error);
        toast.error('Impossible de récupérer les sous-catégories.');
        return [];
    }
}

export const getCategoryParents = async (categoryId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/api/public/v1/product-category/${categoryId}/parents`;
    const options = { method: 'GET' };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!data) return [];
        if (Array.isArray(data)) return data;
        return [data];
    } catch (error) {
        console.error('Failed to fetch category parents:', error);
        toast.error('Impossible de récupérer les catégories parentes.');
        return [];
    }
}
