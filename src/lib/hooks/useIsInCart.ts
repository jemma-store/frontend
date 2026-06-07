import { useCartStore } from "@/store";

export const useIsInCart = (productId: number) =>
  useCartStore((state) => state.cart.items.some((i) => i.productId === productId));
