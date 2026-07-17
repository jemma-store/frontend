import { ProductFormState } from "@/admin-panel/types/productFormState";
import { FILTER_BY_METAL, FILTER_BY_STONE } from "@/admin-panel/constants/filterByDate";

export interface ProductPayload {
    name: string;
    productSizes: number[];
    price: {
        normalPrice: number;
        discountPercentage: number;
    };
    quantity: number;
    isNew: boolean;
    categoryName: string;
    collectionName: string;
    // images: { url: string; isMainImage: boolean; }[];
    description: {
        defaultReturnText: string;
        defaultDeliveryText: string;
        characteristic: {
            metal: string;
            stone: string; 
            color: string;
            averageWeight: number;
            size: {
                width: number;
                height: number;
                length: number;
            };
        };
    };
}


export const prepareProductPayload = (data: ProductFormState): ProductPayload => {
    const metalLabel = FILTER_BY_METAL.find(m => m.value === data.description.characteristic.metal)?.label || "";
    const stoneLabels = data.description.characteristic.stones
        .map(stoneKey => FILTER_BY_STONE.find(s => s.value === stoneKey)?.label)
        .filter(Boolean)
        .join(", ");


    return {
        name: data.name || "",
        productSizes: data.productSizes.length > 0 ? data.productSizes : [0],
        price: {
            normalPrice: Number(data.price.normalPrice) || 0,
            discountPercentage: Number(data.price.discountPercentage) || 0,
        },
        quantity: Number(data.quantity) || 0,
        isNew: data.isNew,
        categoryName: data.categoryName,
        collectionName: data.collectionName,
        // images: data.images, 
        description: {
            defaultReturnText: data.description.defaultReturnText || "Стандартні умови повернення",
            defaultDeliveryText: data.description.defaultDeliveryText || "Стандартні умови доставки",
            characteristic: {
                metal: metalLabel,
                stone: stoneLabels,
                color: data.description?.characteristic?.color || "Не вказано",
                averageWeight: Number(data.description.characteristic.averageWeight) || 0,
                size: {
                    width: Number(data.description.characteristic.size.width) || 0,
                    height: Number(data.description.characteristic.size.height) || 0,
                    length: Number(data.description.characteristic.size.length) || 0,
                }
            }
        }
    };
};