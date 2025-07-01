import { toast } from "sonner";

export const getProductById = async (id: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/api/public/v1/product/${id}`;
    const options = { method: 'GET' };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            toast.error(`Erreur serveur: ${response.status}. Veuillez rafraichir la page`);
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        toast.error('Impossible de récupérer le produit.');
        return null;
    }
}

export const getProductsByFarmId = async (farmId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/api/public/v1/products/farm/${farmId}`;
    const options = { method: 'GET' };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            toast.error(`Erreur serveur: ${response.status}. Veuillez rafraichir la page`);
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch products by farm:', error);
        toast.error('Impossible de récupérer les produits de la ferme.');
        return null;
    }
}
