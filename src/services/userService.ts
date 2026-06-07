import { request } from '@/api/requestService';
import { ApiEndpoint, HttpMethod } from '@/enums';
import { IUserItem } from '@/types/';

const getAllUsers = async (): Promise<IUserItem[]> => {
  const data = await request({
    url: ApiEndpoint.USERS,
    method: HttpMethod.GET,
  });

  return data;
};

const getUserByToken = async (token: string): Promise<IUserItem> => {
  const data = await request({
    headers: { Authorization: `Bearer ${token}` },
    url: ApiEndpoint.USER,
    method: HttpMethod.GET,
  });

  return data;
};

const updateUser = async (
  data: Partial<IUserItem>,
  token: string | null
): Promise<IUserItem> => {
  const response = await request({
    headers: { Authorization: `Bearer ${token}` },
    url: ApiEndpoint.USER_UPDATE,
    method: HttpMethod.PUT,
    data: data,
  });

  return response;
};

const updateUserId = async (
  userId: number,
  data: Partial<IUserItem>,
  token: string
): Promise<IUserItem> => {
  const response = await request({
    headers: { Authorization: `Bearer ${token}` },
    url: `${ApiEndpoint.USER_UPDATE_ID}/${userId}`,
    method: HttpMethod.PUT,
    data: data,
  });
  return response;
};

export {
  getAllUsers,
  getUserByToken,
  updateUser,
  updateUserId
}