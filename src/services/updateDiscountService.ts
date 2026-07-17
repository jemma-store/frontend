import axiosInstance from "@/api/axiosInstance"

export const updateDiscountService = async (id : number, discountPercentage : number ) => {
    try {
        const response = await axiosInstance.put(`/api/admin/products/${id}/discount`, null, {
            params: {
                discountPercentage: discountPercentage 
            }
});
        return response.data;
    } catch (error) {
        console.error("помилка при оновленні знижки : ", error)
    }
}