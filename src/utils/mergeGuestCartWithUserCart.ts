import { localStorageService } from "@/api";
import { LocalStorage } from "@/enums";
import { useCartStore } from "@/store";
import { IGuestCartItem } from "@/types/";

export const mergeGuestCartWithUserCart = async (guestItems: IGuestCartItem[], userId: number) => {
  // console.log('Merging guest cart with user cart...');
  
  try {
    await Promise.all(guestItems.map(item =>
      fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: item.productId, quantity: item.quantity }),
      })
    ));

    const mergedCart = await fetch(`/api/cart/${userId}`).then(res => res.json());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quantity = mergedCart.items.reduce((sum: number, i: any) => sum + i.quantity, 0);

    useCartStore.setState({ cart: mergedCart, cartTotalQuantity: quantity });
    localStorageService.setItem(LocalStorage.CART_PRODUCTS, mergedCart);
    localStorageService.setItem(LocalStorage.CART_QUANTITY, quantity);

    localStorageService.removeItem(LocalStorage.CART_PRODUCTS);
    localStorageService.removeItem(LocalStorage.CART_QUANTITY);

    console.log('Merge successful.');
    return mergedCart;
  } catch (error) {
    console.error('Merge failed:', error);
    throw error;
  }
};
