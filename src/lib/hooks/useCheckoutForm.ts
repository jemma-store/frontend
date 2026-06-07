import { useUserStore } from '@/store';
import { useSmartCart } from './useSmartCart';

export const useCheckoutForm = () => {
  const { cartItems } = useSmartCart();
  const currentUser = useUserStore.getState().currentUser;

  return {
    cartItems,
    currentUser,
  };
};