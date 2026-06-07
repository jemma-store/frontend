import { create } from "zustand";
import { ProductStore, ProductFormState } from "../types/productFormState";

type FormValue = string | number | boolean | Record<string, number> | number[] | string[] | null;

const numericFields = [
  'normalPrice', 
  'discountPercentage', 
  'quantity', 
  'averageWeight', 
  'width', 
  'height', 
  'length'
];

const updateNested = <T extends Record<string, unknown>>(
  obj: T,
  pathKeys: string[],
  value: FormValue,
): T => {
  const [currentKey, ...restKeys] = pathKeys;

  if (restKeys.length === 0) {
    return { ...obj, [currentKey]: value };
  }

  const nextLevel = (obj[currentKey] as Record<string, unknown>) || {};

  return {
    ...obj,
    [currentKey]: updateNested(nextLevel, restKeys, value),
  } as T;
};

const initialFormData = {
  id : 0,
  name: "",
    price: {
      normalPrice: null,
      discountPercentage: null,
    },
    productSizes: [],
    quantity: null,
    isNew: false,
    categoryName: "",
    collectionName: "",
    images : [],
    status : "",
    description: {
      defaultReturnText: "",
      defaultDeliveryText: "",
      characteristic: {
        metal: "",
        stones: [""],
        color: "",
        averageWeight: null,
        size: {
          width: null,
          height: null,
          length: null,
        }
      }
    }
}

export const useProductForm = create<ProductStore>((set) => ({

  formData : initialFormData,
  setFormData: (data) => set({ formData: data }),

  resetForm: () => set({ formData: initialFormData }),

  removeImage: (urlToRemove: string) => set((state) => ({
    formData: {
        ...state.formData,
        images: state.formData.images.filter((img) => img.url !== urlToRemove)
    }
  })),

  addImage : (newImage : {url : string; isMainImage : boolean; file : File}) => set((state) => ({
    formData : {
      ...state.formData,
      images : [...state.formData.images, newImage]
    }
  })),

  updateField: (path, value) =>
    set((state) => {
      const pathKeys = path.split('.');
      const lastKey = pathKeys[pathKeys.length - 1];
      
      let finalValue = value;

      if (numericFields.includes(lastKey)) {
        if (value === "" || value === null || value === undefined) {
          finalValue = null;
        } else {
          const num = Number(value);
          finalValue = isNaN(num) ? null : num;
        }
      }

      return {
        formData: updateNested(
          state.formData as unknown as Record<string, unknown>, 
          pathKeys, 
          finalValue
        ) as unknown as ProductFormState,
      };
    }),
}));