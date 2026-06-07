import { request } from '@/api';
import { ApiEndpoint, HttpMethod } from '@/enums';
import { IGuestCartItem, IGuestCartResponse } from '../types/';

const getProductFromGuestCartService = async (
  guestId: string,
): Promise<IGuestCartItem[]> => {
  const res = await request<IGuestCartItem[]>({
    url: ApiEndpoint.GUEST_CART,
    method: HttpMethod.GET,
    params: { guestId },
  });

  return res;
};

const addToGuestCartService = async (
  productId: number,
  quantity: number,
  guestId: string,
) => {
  return await request<IGuestCartResponse>({
    url: `/api/guest-cart/add?guestId=${encodeURIComponent(guestId)}`,
    method: HttpMethod.POST,
    data: {
      productId,
      quantity
    },
  });
};

const removeFromGuestCartService = async (
  productId: number,
  guestId: string,
): Promise<IGuestCartResponse> => {
  const res = await request<IGuestCartResponse>({
    url: `${ApiEndpoint.GUEST_CART}/remove`,
    method: HttpMethod.DELETE,
    params: {
      productId,
      guestId
    },
  });

  return res;
};

const changeQuantityGuestCartService = async (
  productId: number,
  quantity: number,
  guestId: string,
): Promise<IGuestCartResponse> => {
  const res = await request<IGuestCartResponse>({
    url: `${ApiEndpoint.GUEST_CART}/update`,
    method: HttpMethod.PUT,
    params: {
      productId,
      quantity,
      guestId
    },
  });

  return res;
};

const clearGuestCartService = async (guestId: string): Promise<IGuestCartResponse> => {
  const res = await request<IGuestCartResponse>({
    url: `${ApiEndpoint.GUEST_CART}/clear`,
    method: HttpMethod.DELETE,
    params: {
      guestId
    },
  });

  return res;
};

export {
  getProductFromGuestCartService,
  addToGuestCartService,
  removeFromGuestCartService,
  changeQuantityGuestCartService,
  clearGuestCartService
}
