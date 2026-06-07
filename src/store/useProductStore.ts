import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { LocalStorage } from '@/enums';
import { IFilterParams , IProductItem } from '@/types/';
import { localStorageService } from '@/api';
import { IProducts } from '@/types/products';

import { useCatalogStore } from './useCatalogStore';
import { getAllProducts } from '@/services';

interface ProductState {
  products: IProducts;
  allProducts: IProducts;
  collectionProducts: IProductItem[];
  favorites: number[];
  scales: number[];
  selectedProduct: null | IProductItem,
  loading: boolean;
  hasFetched: boolean;
  isNew: boolean;
  error: string | null;

  getProductById: (id: number) => IProductItem | undefined;
  setIsNew: (value: boolean) => void;
  setProducts: (products: IProducts) => void;
  setCollectionProducts: (collectionProducts: IProductItem[]) => void;
  setAllProducts: (products: IProducts) => void;
  setSelectedProduct: (product: IProductItem) => void;
  filterByCategory: (category: string) => IProductItem[];
  setFavorites: (id: number) => void;
  setScale : (id:number) => void;
  setLoading: (value: boolean) => void;
  setHasFetched: (value: boolean) => void;
  fetchProducts: (signal: AbortSignal) => Promise<void>;
  addProductsToAll: (newProducts: IProductItem[]) => void;
}

export const useProductStore = create<ProductState>()(devtools((set, get) => ({

  products: {
    content: [],
    page: { size: 0, number: 0, totalElements: 0, totalPages: 0 }
  },
  allProducts: {
    content: [],
    page: { size: 0, number: 0, totalElements: 0, totalPages: 0 }
  },
  collectionProducts: [],
  favorites: localStorageService.getItem<number[]>(LocalStorage.FAVORITE_PRODUCTS) ?? [],
  scales: localStorageService.getItem<number[]>(LocalStorage.SCALES_PRODUCTS) ?? [],
  selectedProduct: null,
  loading: false,
  hasFetched: false,
  error: null,
  isNew: false,

  setIsNew: (value) => set({ isNew: value }),
  setHasFetched: (value) => set({ hasFetched: value }),
  setProducts: (products) => {set({ products });
},
  setCollectionProducts: (collectionProducts) => set({ collectionProducts }),
  setAllProducts: (allProducts) => set({ allProducts }),
  setSelectedProduct: (selectedProduct) => set({ selectedProduct }),

  getProductById: (id) => get().allProducts.content.find((product) => product.id === id),

  filterByCategory: (category) => get().products.content.filter((p) => p.categoryName === category),

  setFavorites: (id) => {
    const { favorites } = get();
    const updated = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];

    set({ favorites: updated });
    localStorageService.setItem(LocalStorage.FAVORITE_PRODUCTS, updated);
  },

  setScale : (id) => {
    const {scales} = get();
    const updated = scales.includes(id)
      ? scales.filter((item) => item !== id)
      : [...scales, id];

    set({scales : updated});
    localStorageService.setItem(LocalStorage.SCALES_PRODUCTS, updated);
  },

  setLoading: (value) => set({ loading: value }),

  addProductsToAll: (newProducts) => {
    const { allProducts } = get();
    const mergedMap = new Map([
      ...allProducts.content.map(p => [p.id, p] as [number, IProductItem]),
      ...newProducts.map(p => [p.id, p] as [number, IProductItem])
    ]);

    set({
      allProducts: {
        ...allProducts,
        content: Array.from(mergedMap.values())
      }
    });
  },

  fetchProducts: async (signal: AbortSignal) => {
    const { 
      page, sortBy, selectedCategories, selectedCollections, 
      selectedMaterials, priceRange 
    } = useCatalogStore.getState(); 

    try {
      set({ loading: true, error: null });
      
      if (priceRange[0] === 0 && priceRange[1] === 0) {
        console.warn("Запит скасовано: ціни ще не завантажені");
        return;
      }

      const filters: IFilterParams = {
        page: page - 1, 
        size: 12, 
        sortBy: sortBy,
        categories: selectedCategories,
        collections: selectedCollections,
        materials: selectedMaterials,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      };

      const res = await getAllProducts(filters, signal); 
      
      set((state) => {
        const mergedMap = new Map([
          ...state.allProducts.content.map(p => [p.id, p] as [number, IProductItem]),
          ...res.content.map(p => [p.id, p] as [number, IProductItem])
        ]);

        return {
          products: res,
          allProducts: {
            ...state.allProducts,
            content: Array.from(mergedMap.values())
          },
          loading: false
        };
      });

    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        set({ error: (err as Error).message, loading: false });
      } else {
        set({ loading: false });
      }
    }
  },
})))