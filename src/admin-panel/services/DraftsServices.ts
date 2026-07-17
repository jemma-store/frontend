import axiosInstance from "@/api/axiosInstance"
import { ProductPayload } from "@/utils/prepareProductPayload";

export const getDraftService = async (page : number, pageSize : number) => {
    try {
        const response = await axiosInstance.get("/api/admin/products/drafts", {
            params : {
                page : page,
                pageSize : pageSize,
            }
        }) 
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const saveAsDraftService = async (id: number, payload: ProductPayload) => {
    try {
        const response = await axiosInstance.put(`/api/admin/products/${id}`, payload);
        return response.data
    } catch (error) {
        console.log("Не вдалося зберегти чернетку : ",error)
        throw error;
    }
}