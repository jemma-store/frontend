export type FormValue = string | number | boolean | Record<string, number> | number[] | string[] | null;

export interface ProductStore {
    formData: ProductFormState;
    updateField: (path: string, value: FormValue) => void;
    setFormData: (data: ProductFormState) => void;
    resetForm: () => void;
    removeImage : (urlToRemove : string) => void
    addImage: (newImage: { url: string; isMainImage: boolean; file: File }) => void;
}

export interface ProductFormState {
  id : number;
  name: string;
  price: {
    normalPrice: number | null;
    discountPercentage: number | null;
  };
  productSizes: number[];
  quantity: number | null;
  sku : number;
  isNew: boolean;
  categoryName: string;
  collectionName: string;
  status : string;
  images : {
      url : string;
      isMainImage : boolean;
      file? : File;
  }[];
  description: {
    defaultReturnText: string;
    defaultDeliveryText: string;
    characteristic: {
      metal: string;
      stones: string[];
      color: string;
      averageWeight: number | null;
      size: {
        width: number | null;
        height: number | null;
        length: number | null;
      };
    };
  };
}