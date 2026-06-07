import axiosInstance from "@/api/axiosInstance";    
import axios from 'axios'; 

interface uploadReviewData {
    author: string;
    text: string;
    score: string;
    images: File[];
    productId: string;
}

export const uploadReview = async (reviewData: uploadReviewData) => { 
    try {
        const reviewObject = {
            author: reviewData.author,
            text: reviewData.text,
            score: Number(reviewData.score),
            productId: Number(reviewData.productId),
        };

        const formData = new FormData();
        
        formData.append("review", JSON.stringify(reviewObject));

        if (reviewData.images && reviewData.images.length > 0) {
            reviewData.images.forEach((file: File) => {
                formData.append("images", file);
            });
        } else {
            formData.append("images", "");
        }

        const response = await axiosInstance.post("/api/reviews/upload", formData);
        
        console.log("✅ Відгук успішно відправлено!");
        return response.data;
    } catch (error: any) {
        console.error("❌ Деталі помилки:", error.response?.data);
        throw error;
    }
}

export const getReviewById = async (orderItemId: number) => {
    try {
        const response = await axiosInstance.get(`/api/reviews/${orderItemId}`);
        return response.data;
    } catch (error: unknown) {

        if (axios.isAxiosError(error)) {
            if (error.response) {
                const status = error.response.status;

                if (status === 404) {
                    console.log(`ℹ️ Відгук для ${orderItemId} відсутній.`);
                } else if (status === 500) {
                    console.error(`🔥 Помилка сервера для ${orderItemId}.`);
                } else {
                    console.error(`⚠️ Непередбачена помилка ${status} для ${orderItemId}.`);
                }
            } else if (error.request) {
                console.error("🌐 Проблема з мережею або сервер не відповідає.");
            } else {
                console.error("🛠️ Помилка конфігурації запиту:", error.message);
            }
        } else if (error instanceof Error) {
            console.error("🛠️ Виникла помилка:", error.message);
        } else {
            console.error("🧬 Невідомий тип помилки.");
        }

        return null;
    }
}