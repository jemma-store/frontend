import { request } from '@/api';
import { ApiEndpoint, HttpMethod } from '@/enums';
import { ICartItem } from '@/types/';

const getAllProductsFromCartService = async (
  userId: number,
): Promise<ICartItem> => {
  const res = await request<ICartItem>({
    url: ApiEndpoint.CART,
    method: HttpMethod.GET,
    params: { userId },
  });

  return res;
};

const getProductFromCartService = async (
  userId: number,
  productId: number,
): Promise<ICartItem> => {
  const res = await request<ICartItem>({
    url: `${ApiEndpoint.CART}/items/${productId}`,
    method: HttpMethod.GET,
    params: { userId },
  });

  return res;
};

const addToCartService = async (
  userId: number,
  productId: number,
  quantity: number,
): Promise<ICartItem> => {
  const res = await request<ICartItem>({
    url: `${ApiEndpoint.CART}/add`,
    method: HttpMethod.POST,
    data: {
      productId,
      quantity,
      userId,
    },
  });

  return res;
};

const removeFromCartService = async (
  productId: number,
  userId: number,
): Promise<ICartItem> => {
  const res = await request<ICartItem>({
    url: `${ApiEndpoint.CART}/items/${productId}`,
    method: HttpMethod.DELETE,
    params: {
      userId
    },
  });

  return res;
};

const changeQuantityCartService = async (
  cartId: number, 
  cartItemId: number, 
  productId: number,
  quantity: number,
  userId: number
): Promise<ICartItem> => {
  return await request<ICartItem>({
    url: `${ApiEndpoint.CART}/${cartId}/items/${cartItemId}`, 
    method: HttpMethod.PUT, 
    data: {
      productId,
      quantity,
      userId
    },
  });
};

const clearCartService = async (userId: number): Promise<ICartItem> => {
  const res = await request<ICartItem>({
    url: `${ApiEndpoint.CART}/clear`,
    method: HttpMethod.DELETE,
    params: {
      userId
    },
  });

  return res;
};

export {
  getAllProductsFromCartService,
  getProductFromCartService,
  addToCartService,
  removeFromCartService,
  changeQuantityCartService,
  clearCartService
}
