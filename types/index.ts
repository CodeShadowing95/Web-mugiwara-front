export interface Categorie {
    categorie: string;
    produits: string[];
};

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

export interface CategoryWithChildren {
    id: number;
    name: string;
    description?: string;
    parent?: any;
    children: Array<{ id: number; name: string; description?: string; parent?: any }>;
}