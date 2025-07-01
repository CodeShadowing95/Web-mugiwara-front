// review.ts

import { toast } from "sonner";

export const getProductReviews = async (productId: number) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/api/public/v1/product/${productId}/reviews`;
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
        console.error('Failed to fetch product reviews:', error);
        toast.error('Impossible de récupérer les avis du produit.');
        return null;
    }
}
