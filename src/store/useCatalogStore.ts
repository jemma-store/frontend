import { create } from 'zustand';

import { ICategoryItem, ICollectionItem, IMaterialItem } from '../types/';

interface CatalogState {
  page: number;
  totalPages: number;
  categories: ICategoryItem[];
  category: string | null;
  collections: ICollectionItem[];
  collection: string | null;
  sortBy: string;
  search: string | null;
  materials: IMaterialItem[];
  selectedCategories: string[];
  selectedCollections: string[];
  selectedMaterials: string[];
  priceRange: [number, number];

  loading: boolean;

  setPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  setCategory: (category: string | null) => void;
  setCollection: (collection: string | null) => void;
  setSort: (sortBy: string) => void;
  setSearch: (sortBy: string) => void;
  setCategories: (categories: ICategoryItem[]) => void;
  setCollections: (collections: ICollectionItem[]) => void;
  setMaterials: (materials: IMaterialItem[]) => void;

  setSelectedCategories: (categoriesName: string[]) => void;
  setSelectedCollections: (collectionsName: string[]) => void;
  setSelectedMaterials: (materials: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setLoading: (value: boolean) => void;
}

const areArraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) return false;
  }
  return true;
};

export const useCatalogStore = create<CatalogState>((set, get) => ({
  page: 1,
  totalPages: 1,
  category: null,
  collection: null,
  categories: [],
  collections: [],
  materials: [],
  sortBy: 'asc',
  search: null,
  selectedCategories: [],
  selectedCollections: [],
  selectedMaterials: [],
  priceRange: [20, 37775],

  loading: false,

  setPage: (page) => set({ page }),
  setTotalPages: (totalPages) => set({ totalPages }),
  setCategory: (category) => set({ category }),
  setCollection: (collection) => set({ collection }),
  setMaterials: (materials) => set({materials}),
  setSort: (sortBy) => set({ sortBy }),
  setSearch: (search) => set({ search }),
  setCategories: (categories) => set({categories}),
  setCollections: (collections) => set({collections}),

  setSelectedCategories: (categoriesName) => {
        const currentCategories = get().selectedCategories;
        
        if (!areArraysEqual(categoriesName, currentCategories)) {
            set({ 
                selectedCategories: categoriesName, 
                page: 1 
            });
        }
  },

  setSelectedCollections: (collectionsName) => {
        const currentCollections = get().selectedCollections;
        
        if (!areArraysEqual(collectionsName, currentCollections)) {
            set({ 
                selectedCollections: collectionsName, 
                page: 1 
            });
        }
  },

  setSelectedMaterials: (materials) => set({ selectedMaterials: materials, page: 1 }),
  setPriceRange: (range) => set({ priceRange: range, page: 1 }),
  setLoading: (value) => set({ loading: value }),
  
}));