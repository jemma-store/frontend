import { request } from "@/api";
import { ApiEndpoint, HttpMethod } from "@/enums";
import { IFullOrderDetails } from "@/types/orderDetails";
import { IOrderCreationDTO, IUserCart } from "@/types/order";

const createOrderService = async (
  userCart: IUserCart, 
  orderInfo: IOrderCreationDTO, 
  paymentMethod: string, 
  deliveryMethod: string,
)  => {
  return await request<IFullOrderDetails>({
    url: `${ApiEndpoint.ORDERS}/create`,
    method: HttpMethod.POST,
    params: {
      paymentMethod: paymentMethod.toUpperCase(),
      deliveryMethod: deliveryMethod.toUpperCase(),
    },
    data: {
      userCart: {
        id: userCart.id, 
        userId: userCart.userId,
        items: userCart.items
      },
      orderCreationDTO: orderInfo
    }
  });
};

const createOrderGuestService = async (
  orderData: { userCart: IUserCart; orderCreationDTO: IOrderCreationDTO },
  sessionId: string,
  paymentMethod: string,
  deliveryMethod: string,
) => {
  return await request<IFullOrderDetails>({
    url: `${ApiEndpoint.ORDERS}/guest/create`,
    method: HttpMethod.POST,
    params: {
      sessionId,
      paymentMethod: paymentMethod.toUpperCase(),
      deliveryMethod: deliveryMethod.toUpperCase(),
    },
    data: orderData
  });
};

const getUserOrderService = async (page: number = 0, pageSize: number = 10) => {
  return await request<{ content: IFullOrderDetails[]; page: number }>({
    url: `${ApiEndpoint.ORDERS}/user`,
    method: HttpMethod.GET,
    params: {
      page,
      pageSize,
    }
  });
};

export { createOrderService, createOrderGuestService, getUserOrderService };
