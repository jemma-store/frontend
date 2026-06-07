import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';

import { ContentType } from '@/enums';
import { refreshAccessToken } from '@/services/authService';
import { useAuthStore } from '@/store/useAuthStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    Accept: ContentType.JSON,
    'ngrok-skip-browser-warning': 'true',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { accessToken } = useAuthStore.getState();

    const hasManualAuth = config.headers?.Authorization;

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } 

    else if (config.headers && !hasManualAuth) {
      delete config.headers.Authorization;
    }
    
    return config;
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        console.error("Помилка автоматичного оновлення сесії", err);
      }
      // useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
