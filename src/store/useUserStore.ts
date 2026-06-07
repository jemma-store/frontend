import { create } from 'zustand';

import { IUserItem } from '@/types/';

export interface UserState {
  users: IUserItem[];
  currentUser: IUserItem | null;
  isAuthLoading: boolean;
  setUser: (user: IUserItem) => void;
  setAuthLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  currentUser: null,
  isAuthLoading: true,
  setUser: (user) => set({ currentUser: user }),
  setAuthLoading: (isLoading) => set({ isAuthLoading: isLoading }),
  isAdmin: () => {
    const user = useUserStore.getState().currentUser;
    return user?.role === 'ADMIN';
  }
}));