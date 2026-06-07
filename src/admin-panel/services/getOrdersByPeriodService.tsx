import axiosInstance from "@/api/axiosInstance";

export const getOrdersByPeriodService = async (period : string, page : number, pageSize : number) => {
    const response = await axiosInstance.get('api/orders/by-period', {
        params: {
            period,
            page,
            pageSize,
        },
    })
    console.log("ordersList : ", response.data)
    return response.data;
}