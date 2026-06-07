
import axiosInstance from '@/api/axiosInstance';
import { catchErrorCodes } from './errorService';


interface RequestOptions<T = any> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: T;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export const request = async <TResponse = any, TData = any>(
  options: RequestOptions<TData>
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.request<TResponse>({
      url: options.url,
      method: options.method,
      data: options.data,
      params: options.params,
      headers: options.headers,
    });

    return response.data;
  } catch (error) {
    const description = catchErrorCodes(error);
    console.error('HTTP Request Error:', description, error);

    throw new Error(description);
  }
};
