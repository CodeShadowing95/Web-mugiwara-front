export const getCategories = async () => {
    // WARNING: This is only for development. Do not use in production!
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const url = 'https://localhost/api/public/v1/product-categories';
    const options = { method: 'GET' };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
}