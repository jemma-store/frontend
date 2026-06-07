import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { getProductById } from "@/admin-panel/services/dashBoardStatsService";
import { mapProductToFormState } from "@/utils/mapProductToFormState";
import { useProductForm } from "@/admin-panel/hooks/useProductForm";
import { AddNewProduct } from "./AddNewProduct";

export const EditProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const { setFormData, resetForm } = useProductForm();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            
            try {
                const rawData = await getProductById(id);
                const formattedData = mapProductToFormState(rawData);
                setFormData(formattedData);
            } catch (error) {
                console.error("Помилка при завантаженні товару:", error);
            }
        };

        fetchProduct();

        return () => resetForm();
    }, [id, setFormData, resetForm]);

    return (
        <AddNewProduct disabled={false} /> 
    );
};