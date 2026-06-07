import axiosInstance from "@/api/axiosInstance";

export const uploadImage = async (file: File, productId: number, isMain: boolean = false) => {
    try {
        const formData = new FormData();
        formData.append("file", file); // Додаємо сам файл

        const response = await axiosInstance.post("/api/images/upload", formData, {
            params: {
                productId: productId,
                isMain: isMain
            },
            headers: {
                "Content-Type": "multipart/form-data" // Важливо для завантаження файлів
            }
        });

        return response.data; // Припустимо, тут повертається URL або ID картинки
    } catch (error) {
        console.error("❌ Помилка при завантаженні зображення:", error);
        throw error;
    }
}