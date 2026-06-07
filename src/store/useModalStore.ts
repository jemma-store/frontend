import { create } from 'zustand';

type ModalType = 
|'phoneVerification' 
| 'deleteFromCart' 
| 'cart'
| 'registrationSuccess' 
| null;

interface ModalState {
  openModal: ModalType;
  payload : string | null;
  phone: string;
  error: string | null;
  deleteProductId: number | null;
  
  open: (modal: ModalType, payload?: string | null) => void;
  setError: (error: string | null) => void;
  close: () => void;
  openDeleteFromCartModal: (id: number) => void;
  backToCart: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  payload : null,
  openModal: null,
  phone: '',
  error: null,
  deleteProductId: null,

  open: (modal, payload) => set({ openModal: modal, payload:payload || null }),
  close: () => set({ openModal: null }),

  setError: (error) => set({ error }),
  backToCart: () => set({ openModal: 'cart', deleteProductId: null }),

  openDeleteFromCartModal: (id: number) =>
    set({ openModal: 'deleteFromCart', deleteProductId: id }),
}));