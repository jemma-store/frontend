import { request } from './requestService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface SubmitFormOptions<TData, _TResponse> {
  url: string;
  method: 'POST' | 'PUT' | 'DELETE';
  data: TData;
}

export const submitForm = async <TData, TResponse>(
  options: SubmitFormOptions<TData, TResponse>
): Promise<TResponse> => {
  return await request<TResponse, TData>({
    url: options.url,
    method: options.method,
    data: options.data,
  });
};
