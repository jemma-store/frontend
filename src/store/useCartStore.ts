import { create } from 'zustand';
import { LocalStorage } from '@/enums';
import { localStorageService } from '@/api';
import { useUserStore } from './useUserStore';
import { ICartItem, IProductItem } from '@/types/';

import {
  fetchProductById,
  addToCartService,
  getAllProductsFromCartService,
  changeQuantityCartService,
  removeFromCartService,
  clearCartService,
} from '@/services';

interface CartState {
  cart: ICartItem;
  cartTotalQuantity: number;
  isLoading: boolean;
  cartProducts: IProductItem[];

  fetchCart: () => Promise<void>;
  isInCart: (productId: number) => boolean;
  addToCart: (product: IProductItem, qty?: number) => Promise<void>;
  increaseQuantity: (productId: number) => Promise<void>;
  decreaseQuantity: (productId: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const defaultCart: ICartItem = {
  id: null,
  userId: null,
  items: [],
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: defaultCart,
  cartProducts: [],
  cartTotalQuantity: 0,
  isLoading: false,

  isInCart: (productId) => get().cart.items.some(i => i.productId === productId),

  fetchCart: async () => {
    const userId = useUserStore.getState().currentUser?.id;
    if (!userId) {
      set({ cart: defaultCart, cartTotalQuantity: 0, cartProducts: [] });
      return;
    }

    set({ isLoading: true });
    try {
      const data = await getAllProductsFromCartService(userId);
      const items = data?.items || [];

      const currentLoadedProducts = [...get().cartProducts];
      
      const productsData = await Promise.all(
        items.map(async (item) => {
          let product = currentLoadedProducts.find(p => p.id === item.productId);

          if (!product) {
            try {
              product = await fetchProductById(item.productId);
            } catch (e) {
              console.error(`Помилка завантаження продукту ${item.productId}`, e);
            }
          }
          return product;
        })
      );

      const uniqueProducts = Array.from(
        new Map(
          productsData
            .filter((p): p is IProductItem => !!p)
            .map(p => [p.id, p])
        ).values()
      );

      const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);

      set({ 
        cart: { ...data, items }, 
        cartProducts: uniqueProducts,
        cartTotalQuantity: totalQty, 
        isLoading: false 
      });

      localStorageService.setItem(LocalStorage.CART_QUANTITY, totalQty);
    } catch (error) {
      console.error("Помилка fetchCart:", error);
      set({ isLoading: false });
    }
  },

  addToCart: async (product, qty = 1) => {
    const userId = useUserStore.getState().currentUser?.id;
    if (!userId) return;

    try {
      await addToCartService(userId, product.id, qty);
      await get().fetchCart();
    } catch (error) {
      console.error("Помилка при додаванні в кошик:", error);
    }
  },

  increaseQuantity: async (productId) => {
    const userId = useUserStore.getState().currentUser?.id;
    const cart = get().cart;
    const item = cart.items.find(i => i.productId === productId);

    if (!item || !userId || !cart.id) return;

    try {
      await changeQuantityCartService(cart.id, item.id, productId, item.quantity + 1, userId);
      await get().fetchCart();
    } catch (error) {
      console.error("Помилка при збільшенні кількості:", error);
    }
  },

  decreaseQuantity: async (productId) => {
    const userId = useUserStore.getState().currentUser?.id;
    const cart = get().cart;
    const item = cart.items.find(i => i.productId === productId);
    
    if (!userId || !item || !cart.id) return;

    try {
      if (item.quantity <= 1) {
        await get().removeFromCart(productId);
      } else {
        await changeQuantityCartService(cart.id, item.id, productId, item.quantity - 1, userId);
        await get().fetchCart();
      }
    } catch (error) {
      console.error("Помилка при зменшенні кількості:", error);
    }
  },

  removeFromCart: async (productId) => {
    const userId = useUserStore.getState().currentUser?.id;
    if (!userId) return;

    try {
      await removeFromCartService(productId, userId);
      
      await get().fetchCart();
    } catch (error) {
      console.error("Помилка при видаленні з кошика:", error);
    }
  },

  clearCart: async () => {
    const userId = useUserStore.getState().currentUser?.id;
    if (!userId) return;
    
    try {
      await clearCartService(userId);
      set({ cart: defaultCart, cartTotalQuantity: 0, cartProducts: [] });
      localStorageService.removeItem(LocalStorage.CART_PRODUCTS);
      localStorageService.removeItem(LocalStorage.CART_QUANTITY);
    } catch (error) {
      console.error("Помилка при очищенні кошика:", error);
    }
  },
}));