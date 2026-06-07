import axiosInstance from "@/api/axiosInstance"

export const searchUserService = async (query : string, page : number | string, pageSize: number | string) => {
    try {
        const response = await axiosInstance.get("/api/users/search", {
        params : {
            query,
            page, 
            pageSize,
        }
    });

    return response.data

    } catch(error) {
        console.log("Помилка при пошуку юзера : ", error)
        throw error;
    }
}