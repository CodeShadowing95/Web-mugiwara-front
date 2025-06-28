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
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Response is not JSON");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
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
        throw error;
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Response is not JSON");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch products by category:', error);
        throw error;
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Response is not JSON");
        }

        const data = await response.json();
        if (!data) return [];
        if (Array.isArray(data)) return data;
        return [data];
    } catch (error) {
        console.error('Failed to fetch category children:', error);
        throw error;
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
        return [];
    }
}
