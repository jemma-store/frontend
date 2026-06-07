import { create } from "zustand";
import { IProductItem } from "../types/index";

interface CompareState {
    compareItems: IProductItem[];

    addToCompare: (product: IProductItem) => void;
    setCompareItems: (products: IProductItem[]) => void;
}

export const useCompareStore = create<CompareState>((set) => ({
    compareItems: [],

    setCompareItems: (products) => set({ compareItems: products }),
    addToCompare: (product) => set((state) => {

    const isAlreadyAdded = state.compareItems.some((item) => item.id === product.id);

    if (!isAlreadyAdded && state.compareItems.length < 4) {
      return { compareItems: [...state.compareItems, product] };
    }

    return state;
  }),

}));