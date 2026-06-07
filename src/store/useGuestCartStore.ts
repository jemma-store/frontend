import { create } from 'zustand';
import {
  addToGuestCartService,
  changeQuantityGuestCartService,
  clearGuestCartService,
  fetchProductById,
  getOrCreateGuestId,
  getProductFromGuestCartService,
  removeFromGuestCartService
} from '@/services';
import { LocalStorage } from '@/enums';
import { IGuestCartItem, IProductItem } from '@/types/';

interface GuestCartState {
  guestCart: IGuestCartItem[];
  cartTotalQuantity: number;
  isLoading: boolean;
  guestId: string;
  loadedProducts: IProductItem[];

  fetchGuestCart: () => Promise<void>;
  createGuestCart: () => Promise<void>;
  isInCart: (productId: number) => boolean;
  addToCart: (product: IProductItem) => Promise<void>;
  increaseQuantity: (productId: number) => Promise<void>;
  decreaseQuantity: (productId: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useGuestCartStore = create<GuestCartState>((set, get) => ({
  guestCart: [],
  cartTotalQuantity: 0,
  isLoading: false,
  guestId: getOrCreateGuestId(),
  loadedProducts: [],

  fetchGuestCart: async () => {
    const { guestId } = get();
    if (!guestId) return;

    set({ isLoading: true });
    try {
      const items = await getProductFromGuestCartService(guestId);
      
      if (!items || items.length === 0) {
        set({ guestCart: [], cartTotalQuantity: 0, loadedProducts: [], isLoading: false });
        return;
      }

      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
      
      const productPromises = items.map(item => fetchProductById(item.productId));
      const resolvedProducts = await Promise.all(productPromises);

      set({
        guestCart: items,
        cartTotalQuantity: totalQuantity,
        loadedProducts: resolvedProducts,
        isLoading: false
      });
    } catch (error) {
      console.error("Помилка завантаження гостьового кошика:", error);
      set({ isLoading: false });
    }
  },

  createGuestCart: async () => {
    const { guestId } = get();
    localStorage.setItem(LocalStorage.GUEST_CART_ID, guestId);
    set({ guestCart: [], cartTotalQuantity: 0, loadedProducts: [] });
  },

  isInCart: (productId) => {
    return get().guestCart.some((i) => i.productId === productId);
  },


  addToCart: async (product) => {
    const { guestId, guestCart, fetchGuestCart, isLoading } = get();
    if (!guestId || isLoading) return;
    const existingItem = guestCart.find((i) => i.productId === product.id);
    const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

    set({ isLoading: true });

    try {
      await addToGuestCartService(product.id, newQuantity, guestId); 
      await fetchGuestCart();
    } catch (error) {
      console.error("Помилка:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  increaseQuantity: async (productId) => {
    const { guestId, guestCart, fetchGuestCart } = get();
    const item = guestCart.find((i) => i.productId === productId);
    if (!guestId || !item) return;

    await changeQuantityGuestCartService(productId, item.quantity + 1, guestId);
    await fetchGuestCart();
  },

  decreaseQuantity: async (productId) => {
    const { guestId, guestCart, fetchGuestCart } = get();
    const item = guestCart.find((i) => i.productId === productId);
    if (!guestId || !item || item.quantity <= 1) return;

    await changeQuantityGuestCartService(productId, item.quantity - 1, guestId);
    await fetchGuestCart();
  },

  removeFromCart: async (productId) => {
  const { guestId, fetchGuestCart } = get();

  if (!guestId) {
    console.error("ЗАПИТ НЕ ВІДПРАВЛЕНО: guestId відсутній у сторі");
    return;
  }

  try {
    await removeFromGuestCartService(productId, guestId);
    await fetchGuestCart();
  } catch (error) {
    console.error("Помилка в removeFromCartService:", error);
    throw error; 
  }
},

  clearCart: async () => {
    const { guestId } = get();
    if (!guestId) return;

    await clearGuestCartService(guestId);
    set({ guestCart: [], cartTotalQuantity: 0, loadedProducts: [] });
  },
}));