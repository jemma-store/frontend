import { useEffect, useState } from "react"
import axiosInstance from "@/api/axiosInstance";

export const useProfileEditor = <T extends Record<string, any>>(initialData: T | null, userId?: string | number) => {
    
    const [formData, setFormData] = useState<T | null>(initialData);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        }
    }, [initialData])

    const updateField = <K extends keyof T>(field: K, value: T[K]) => {
        setFormData(prev => prev ? { ...prev, [field]: value } : prev);
    }

    const saveProfile = async () => {
        if (!formData) return; 

        setIsLoading(true);
        try {
            const endpoint = userId ? `/api/users/update/${userId}` : "/api/users/update";
            const response = await axiosInstance.put(endpoint, formData);
            console.log("Успішно збережено:", response.data);
        } catch (error) {
            console.error("Помилка при редагуванні данних : ", error)
        } finally {
            setIsLoading(false);
        }
    }

    return { formData, updateField, saveProfile, isLoading };
}