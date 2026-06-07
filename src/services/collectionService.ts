import { request } from '@/api/requestService';
import { ApiEndpoint, HttpMethod } from '@/enums';
import { ICollectionItem } from '@/types/';

const getAllCollections = async (): Promise<ICollectionItem[]> => {
  const data = await request({
    url: ApiEndpoint.COLLECTIONS,
    method: HttpMethod.GET,
  });

  return data;
};

const getCollectionByName = async (name: string): Promise<ICollectionItem> => {
  const data = await request({
    url: `${ApiEndpoint.COLLECTIONS}/name/${name}`,
    method: HttpMethod.GET,
  });

  return data;
};

const getCollectionById = async (id: string): Promise<ICollectionItem> => {
  const data = await request({
    url: `${ApiEndpoint.COLLECTIONS}/id/${id}`,
    method: HttpMethod.GET,
  });

  return data;
};

const updateCollection = async (
  id: number,
  data: Partial<ICollectionItem>
): Promise<ICollectionItem> => {
  const response = await request({
    url: `${ApiEndpoint.COLLECTIONS}/${id}`,
    method: HttpMethod.PUT,
    data: data,
  });

  return response;
};

const createCollection = async (
  data: Partial<ICollectionItem>
): Promise<ICollectionItem> => {
  const response = await request({
    url: ApiEndpoint.COLLECTIONS,
    method: HttpMethod.POST,
    data: data,
  });

  return response;
};

const deleteCollection = async (name: string): Promise<void> => {
  const response = await request<void>({
    url: `${ApiEndpoint.COLLECTIONS}/${name}`,
    method: HttpMethod.DELETE,
  });

  return response;
}

export {
  getAllCollections,
  getCollectionByName,
  getCollectionById,
  updateCollection,
  createCollection,
  deleteCollection
}