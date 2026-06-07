import { useEffect, useMemo } from 'react';
import { LocalStorage } from '@/enums';
import { IProductItem, IFormSchema } from '@/types/';
import { IOrderRequest } from '@/types/order';
import { localStorageService } from '@/api';
import { 
  useCartStore, 
  useGuestCartStore, 
  useProductStore, 
  useUserStore 
} from '@/store';
import {  
  removeFromGuestCartService,
  changeQuantityGuestCartService,
  createOrderService,
  createOrderGuestService 
} from '@/services';

export const useSmartCart = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const sessionId = localStorage.getItem(LocalStorage.SESSION_ID) || '';

  const getProductById = useProductStore((state) => state.getProductById);
  const guestProducts = useGuestCartStore((state) => state.loadedProducts);
  const { cartProducts } = useCartStore();

  const {
    addToCart: addUserToCart,
    removeFromCart: removeUserFromCart,
    increaseQuantity: increaseUserQuantity,
    decreaseQuantity: decreaseUserQuantity,
    isInCart: isUserInCart,
    cartTotalQuantity: userCartQuantity,
    cart: userCart,
    clearCart: resetUserCart, 
  } = useCartStore();

  const {
    removeFromCart: removeGuestFromCart,
    increaseQuantity: increaseGuestQuantity,
    decreaseQuantity: decreaseGuestQuantity,
    isInCart: isGuestInCart,
    cartTotalQuantity: guestCartQuantity,
    guestCart,
    clearCart: resetGuestCart,
  } = useGuestCartStore();

  const isGuest = !currentUser;

  // Функція для повного очищення кошика
  const clearCart = () => {
    if (isGuest) {
      if (typeof resetGuestCart === 'function') resetGuestCart();
      localStorageService.removeItem(LocalStorage.CART_PRODUCTS);
      localStorageService.removeItem(LocalStorage.CART_QUANTITY);
    } else {
      if (typeof resetUserCart === 'function') resetUserCart();
    }
  };

  useEffect(() => {
    if (!isGuest) return;
    localStorageService.setItem(LocalStorage.CART_PRODUCTS, guestCart);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, guestCartQuantity);
  }, [guestCart, guestCartQuantity, isGuest]);

  const cartItemsWithData = useMemo(() => {
    const rawItems = isGuest ? guestCart : userCart?.items || [];

    return rawItems
      .map(({ productId, quantity }) => {
        const product = isGuest
          ? guestProducts.find(p => p.id === productId)
          : cartProducts.find(p => p.id === productId) || getProductById(productId);

        if (!product) return null;
        return { product, quantity };
      })
      .filter(Boolean) as { product: IProductItem; quantity: number }[];
  }, [isGuest, guestCart, userCart, cartProducts, getProductById, guestProducts]);

  const createOrder = async (formData: IFormSchema) => {
    try {
      const orderCreationDTO = {
        firstName: formData.personalInfo.firstName,
        lastName: formData.personalInfo.lastName,
        fatherName: formData.personalInfo.fatherName || '',
        phone: formData.personalInfo.phone,
        email: formData.personalInfo.email,
        city: formData.deliveryInfo.city,
        isGift: formData.personalInfo.isGift,
        cardNumber: formData.paymentInfo.cardData?.number || '',
        expiryDate: formData.paymentInfo.cardData?.expiry || '',
        cvv: formData.paymentInfo.cardData?.cvv || '',
      };

      if (currentUser) {
        const userCartData = {
          id: userCart?.id || 0,
          userId: currentUser.id,
          items: userCart?.items.map((item) => ({
            id: item.id,
            cartId: item.cartId,
            productId: item.productId,
            quantity: item.quantity,
          })) || [],
        };

        return await createOrderService(
          userCartData,
          orderCreationDTO,
          formData.paymentInfo.method,
          formData.deliveryInfo.method
        );
      } else {
        const guestRequest: IOrderRequest = {
          userCart: {
            id: 0,
            userId: 0,
            items: guestCart.map((item) => ({
              id: 0,
              cartId: 0,
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
          orderCreationDTO,
        };

        return await createOrderGuestService(
          guestRequest,
          sessionId,
          formData.paymentInfo.method,
          formData.deliveryInfo.method
        );
      }
    } catch (error) {
      console.error('Помилка при створенні замовлення:', error);
      throw error;
    }
  };

  const cartTotalQuantity = isGuest ? guestCartQuantity : userCartQuantity;

  return {
    addToCart: async (product: IProductItem) => {
      if (isGuest) {
        await useGuestCartStore.getState().addToCart(product);
      } else {
        addUserToCart(product);
      }
    },
    increaseQuantity: async (productId: number) => {
      if (isGuest) {
        const currentItem = guestCart.find(item => item.productId === productId);
        if (currentItem) {
          await changeQuantityGuestCartService(productId, currentItem.quantity + 1, sessionId);
          increaseGuestQuantity(productId);
        }
      } else {
        increaseUserQuantity(productId);
      }
    },
    decreaseQuantity: async (productId: number) => {
      if (isGuest) {
        const currentItem = guestCart.find(item => item.productId === productId);
        if (currentItem && currentItem.quantity > 1) {
          await changeQuantityGuestCartService(productId, currentItem.quantity - 1, sessionId);
          decreaseGuestQuantity(productId);
        }
      } else {
        decreaseUserQuantity(productId);
      }
    },
    removeFromCart: async (productId: number) => {
      if (isGuest) {
        await removeFromGuestCartService(productId, sessionId);
        removeGuestFromCart(productId);
      } else {
        removeUserFromCart(productId);
      }
    },
    isInCart: (productId: number) => isGuest ? isGuestInCart(productId) : isUserInCart(productId),
    createOrder,
    clearCart,
    cartItems: isGuest ? guestCart : userCart?.items || [],
    cartItemsWithData,
    cartTotalQuantity,
  };
};