import { toast } from "sonner";

export const getFarms = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const url = `${apiUrl}/api/public/v1/farms`;
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
        console.error('Failed to fetch farms:', error);
        toast.error('Impossible de récupérer les fermes.');
        return null;
    }
}

export const getFarmById = async (id: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/api/public/v1/farm/${id}`;
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
        console.error('Failed to fetch farm:', error);
        toast.error('Impossible de récupérer la ferme.');
        return null;
    }
}