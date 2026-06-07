export interface IOrderProduct {
    id: number;
    name: string;
    sku: string;
    categoryName: string;
    collectionName: string;
    price: {
        normalPrice: number;
        discountPercentage: number;
        discountedPrice: number;
    };
    images: {
        url: string;
        isMainImage: boolean;
    }[];
}

export interface IOrderItem {
    id: number;
    product: IOrderProduct; 
}

export interface IFullOrderDetails {
    id: number; 
    orderNumber: string;
    userId: number | null; 
    status: string;
    totalPrice: number;
    createdAt: string; 
    items: IOrderItem[]; 
    orderDetails: {
        firstName: string;
        lastName: string;
        fatherName?: string;  
        phone: string;
        email: string;
        city : string;
        deliveryMethod: string;
        paymentMethod: string;
    };
    cardData : {
        curdNumber : string;
        expiryData : string;
    };
    isGift: boolean | null;
    length : string;
}