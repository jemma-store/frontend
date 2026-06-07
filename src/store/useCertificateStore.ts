import { create } from 'zustand';

import { ICertificateItem } from '../types/';
import { certificates } from '@/mock/certificates';
import { localStorageService } from '@/api';
import { LocalStorage } from '@/enums';

interface CertificateState {
  certificates: ICertificateItem[];
  favorites: number[];
  loading: boolean;
  error: string | null;

  setCertificates: (certificates: ICertificateItem[]) => void;
  getCertificateById: (id: number) => ICertificateItem | undefined,
  setFavorites: (id: number) => void;
}

export const useCertificateStore = create<CertificateState>((set, get) => ({
  certificates: certificates,
  favorites: localStorageService.getItem<number[]>(
    LocalStorage.FAVORITE_CERTIFICATES
  ) ?? [],
  loading: false,
  error: null,

  setCertificates: (certificates) => set((state) => {
    const isSame =
      state.certificates.length === certificates.length &&
      state.certificates.every((c, i) => c.id === certificates[i].id);

      return isSame ? {} : { certificates };
  }),

  getCertificateById: (id) => get().certificates.find((item) => item.id === id),

  setFavorites: (id) => {
    const { favorites } = get();
    const isFav = favorites.includes(id);
    const updated = isFav
      ? favorites.filter((fid) => fid !== id)
      : [...favorites, id];

    set({ favorites: updated });
    localStorageService.setItem(LocalStorage.FAVORITE_PRODUCTS, updated);
  },
}))