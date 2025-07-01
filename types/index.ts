export interface Farm {
    id: number;
    avatar: string;
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
    createdAt: string;
    updatedAt: string;

    color?: string;
    status?: string;
    distance?: number;
    rating?: number;
    reviews?: Review[];
    products?: Product[];
    customers?: User[];
    tags?: Tag[];
    type?: string;
    totalSales?: string;
    monthlyOrders?: number;
}

export interface User {
    id: number;
    uuid: number;
    roles: string[];
    persona: Persona;
}

export interface Persona {
    user_id: number;
    email: string;
    firstName: string;
    lastName: string;
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
    thumbnail: Media;
    children: Category[];
}

export interface Product {
    id: number;
    name: string;
    shortDescription: string;
    longDescription: string;
    price: number;
    unit: string;
    unitPrice: number;
    unity: Unity;
    oldPrice: number;
    origin: string;
    featured: boolean;
    stock: number;
    categories: Category[];
    conservation: string;
    preparationAdvice: string;
    imageUrl?: string;
    reviews: Review[];
    farm: Farm;
    tags?: Tag[];
    medias?: Media[];
}

export interface Review {
    id: number;
    productId: number;
    user: User;
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

export interface MediaType {
    id: number;
    name: string;
    slug: string;
}

export interface Media {
    id: number;
    realName: string;
    realPath: string;
    publicPath: string;
    mime: string;
    status: string;
    uploadedAt: string;
    mediaType: MediaType;
}