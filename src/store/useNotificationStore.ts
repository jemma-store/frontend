import { create } from 'zustand';

interface NotificationState {
  message: string | null;
  type: 'success' | 'error' | 'info' | null;
  setNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  message: null,
  type: null,
  setNotification: (message, type = 'info') => set({ message, type }),
  clearNotification: () => set({ message: null, type: null }),
}));
