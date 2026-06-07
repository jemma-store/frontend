import axiosInstance from "@/api/axiosInstance";

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get("/api/users");
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export const getUserById = async (id : string) => {
    try {
        const response = await axiosInstance.get(`api/users/id/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}