export const getFarms = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const url = `${apiUrl}/api/public/v1/farms`;
    const options = { method: 'GET' };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch farms:', error);
        throw error;
    }
}