import axiosInstance from "@/api/axiosInstance"
import { ApiEndpoint } from "@/enums"
import { IFullOrderDetails } from "@/types/orderDetails"

export const getOrderById = async (id: string): Promise<IFullOrderDetails> => {
    const response = await axiosInstance.get<IFullOrderDetails>(ApiEndpoint.ORDER_BY_ID(id));
    console.log("orderById : ", response.data)
    return response.data;
}