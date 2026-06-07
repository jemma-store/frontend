import axiosInstance from "@/api/axiosInstance";
import { AxiosError } from "axios";

export const createProductService = async (payload: any) => {
    try {
        const response = await axiosInstance.post("/api/products", payload);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Помилка при створенні товару:", axiosError.response?.data || axiosError.message);
        throw error;
    }
};

export const deleteProductByIdService = async (id: number): Promise<void> => {
    try {
        const response = await axiosInstance.delete(`/api/products/${id}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Помилка при видаленні товару:', axiosError.response?.data || axiosError.message);
        throw error; 
    }
}