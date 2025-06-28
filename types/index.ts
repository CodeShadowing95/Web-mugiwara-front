export interface Ferme {
    name: string;
    description: string;
    farmType: string;
    certifications: string[];
    address: string;
    city: string;
    zipCode: string;
    region: string;
    coordinates: { lat: string; lng: string };
    phone: string;
    email: string;
    website: string;
    farmSize: string;
    // productionMethods: string[];
    mainProducts: string[];
    seasonality: string;
    deliveryZones: string[];
    deliveryMethods: string[];
    minimumOrder: string;
    profileImage: string;
    galleryImages: string[];
}

export interface Persona {
    user_id: number;
    email: string;
    first_name: string;
    last_name: string;
    address: string;
    zip_code: number;
    city: string;
    phone_number: string;
    birth_date: string;
    gender: string;
}

export interface Category {
    id: number;
    name: string;
    description?: string;
    parent?: any;
    children: Array<{ id: number; name: string; description?: string; parent?: any }>;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    unit: string;
    featured: boolean;
    stock: number;
    category: Category;
    imageUrl?: string;
    farmId: number;
    tags?: Tag[];
    medias?:[]
}

export interface Tag {
    id: number;
    name: string;
    bgColor: string;
    textColor: string;
    slug: string;
}