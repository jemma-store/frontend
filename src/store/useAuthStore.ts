import { create } from 'zustand';

import { LocalStorage } from '@/enums';
import { localStorageService } from '@/api/localStorageService';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuth: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => {
  const access = localStorageService.getItem(LocalStorage.ACCESS_TOKEN_KEY);
  const refresh = localStorageService.getItem(LocalStorage.REFRESH_TOKEN_KEY);

  return {
    accessToken: access,
    refreshToken: refresh,
    isAuth: !!access,
    setTokens: (accessToken, refreshToken) => {
      localStorageService.setItem(LocalStorage.ACCESS_TOKEN_KEY, accessToken);
      localStorageService.setItem(LocalStorage.REFRESH_TOKEN_KEY, refreshToken);
      set({ accessToken, refreshToken });
      set({ accessToken, refreshToken, isAuth: true });
    },
    logout: () => {
      localStorageService.removeItem(LocalStorage.ACCESS_TOKEN_KEY);
      localStorageService.removeItem(LocalStorage.REFRESH_TOKEN_KEY);
      set({ accessToken: null, refreshToken: null });
      set({ accessToken: null, refreshToken: null, isAuth: false });
    },
  };
});
