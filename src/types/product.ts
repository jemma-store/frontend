import { IPriceItem } from "./price";

export interface IProductItem {
  id: number;
  name: string;
  productSizes?: number[];
  price: IPriceItem;
  isNew?: boolean;
  quantity: number;
  status : string;
  sku: string;
  images: {
    url: string;
    isMainImage: boolean;
  }[];
  categoryName: string;
  collectionName: string;
  description?: {
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
