import { request } from '@/api/requestService';
import { ApiEndpoint, HttpMethod } from '@/enums';
import { ICategoryItem } from '@/types/';

const getAllCategories = async (): Promise<ICategoryItem[]> => {
  const data = await request({
    url: ApiEndpoint.CATEGORIES,
    method: HttpMethod.GET,
  });

  return data;
};

const getCategoryByName = async (name: string): Promise<ICategoryItem> => {
  const data = await request({
    url: `${ApiEndpoint.CATEGORIES}/name/${name}`,
    method: HttpMethod.GET,
  });

  return data;
};

const getCategoryById = async (id: string): Promise<ICategoryItem> => {
  const data = await request({
    url: `${ApiEndpoint.CATEGORIES}/id/${id}`,
    method: HttpMethod.GET,
  });

  return data;
};

const updateCategory = async (
  id: number,
  data: Partial<ICategoryItem>
): Promise<ICategoryItem> => {
  const response = await request({
    url: `${ApiEndpoint.CATEGORIES}/${id}`,
    method: HttpMethod.PUT,
    data: data,
  });

  return response;
};

const createCategory = async (
  data: Partial<ICategoryItem>
): Promise<ICategoryItem> => {
  const response = await request({
    url: ApiEndpoint.CATEGORIES,
    method: HttpMethod.POST,
    data: data,
  });

  return response;
};

const deleteCategory = async (name: string): Promise<void> => {
  const response = await request<void>({
    url: `${ApiEndpoint.CATEGORIES}/${name}`,
    method: HttpMethod.DELETE,
  });

  return response;
}

export {
  getAllCategories,
  getCategoryByName,
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
}