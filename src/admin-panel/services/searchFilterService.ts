import axiosInstance from "@/api/axiosInstance"

export const searchQueryService = async (query: string, size: number, page: number, categories: string[], collections: string[], status: string = "PUBLISHED") => {
    try {
        const response = await axiosInstance.get("/api/products/search", {
            params: {
                query: query || undefined,
                size: size,
                page: page,
                categories: categories.length >= 1 ? categories.toString() : undefined,
                collections: collections.length >= 1 ? collections.toString() : undefined,
                status: status 
            },
        });
        return response.data
    } catch (error) {
        console.error(error)
        return [];
    }
}