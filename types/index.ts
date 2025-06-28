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
    children: Category[];
}

export interface Product {
    id: number;
    name: string;
    description: string;
    longDescription: string;
    price: number;
    unit: string;
    unitPrice: number;
    unity: Unity;
    origin: string;
    featured: boolean;
    stock: number;
    category: Category;
    conservation: string;
    preparationAdvice: string;
    imageUrl?: string;
    reviews: Review[];
    farm: Ferme;
    tags?: Tag[];
    medias?:[]
}

export interface Review {
    id: number;
    productId: number;
    userId: number;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export interface Tag {
    id: number;
    name: string;
    bgColor: string;
    textColor: string;
    slug: string;
}

export interface Unity {
    id: number,
    name: string;
    symbol: string;
}