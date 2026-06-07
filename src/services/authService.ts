import axios from 'axios';

import { submitForm } from '../api/formService';
import { request } from '@/api/requestService';
import { useAuthStore } from '@/store/useAuthStore';
import { localStorageService } from '../api/localStorageService';
import { ApiEndpoint, HttpMethod, LocalStorage } from '@/enums';
import { RegisterRequest, RegisterResponse, VerifyResponse, VerifyRequest, LoginResponse, LoginRequest, IUserItem } from '@/types/';

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorageService.getItem(LocalStorage.REFRESH_TOKEN_KEY);
  if (!refreshToken) return null;

  try {
    const response = await axios({
      method: 'post',
      url: `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
      data: { refreshToken },
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    if (accessToken) {
      useAuthStore.getState().setTokens(accessToken, newRefreshToken || refreshToken);
      return accessToken;
    }
    return null;
  } catch (error) {
    console.error("Рефреш не вдався на рівні мережі:", error);
    return null;
  }
};

const registerUser = async (userData: Partial<RegisterRequest>): Promise<RegisterResponse> => {
  const data = await request<RegisterResponse>({
    url: ApiEndpoint.SIGNUP,
    method: HttpMethod.POST,
    data: userData,
  });

  return data;
};

const useRegister = () => {
  const register = async (data: RegisterRequest) => {
    return await submitForm<RegisterRequest, RegisterResponse>({
      url: ApiEndpoint.SIGNUP,
      method: HttpMethod.POST,
      data,
    });
  };

  return { register };
};

const verifyPhoneNumber = async (code: VerifyRequest, sessionToken : string | null): Promise<VerifyResponse> => {

  if (sessionToken === null) {
   throw new Error("Помилка сесії: відсутній токен верифікації.");
  }

  const data = await request<VerifyResponse>({
    headers: { Authorization: `Bearer ${sessionToken}` },
    url: ApiEndpoint.USER_VERIFY,
    method: HttpMethod.POST,
    data: code,
  });

  return data;
};

const verifyPhoneLogin = async (code: VerifyRequest, sessionToken : string | null): Promise<VerifyResponse> => {

   if (sessionToken === null) {
   throw new Error("Помилка сесії: відсутній токен верифікації.");
  }

  const data = await request<VerifyResponse>({
    headers: { Authorization: `Bearer ${sessionToken}` },
    url: ApiEndpoint.USER_VERIFY_LOGIN,
    method: HttpMethod.POST,
    data: code,
  });

  return data;
};

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await request<LoginResponse>({
    url: ApiEndpoint.SIGNIN,
    method: HttpMethod.POST,
    data,
  });

  return response;
};

const handleAuthError = () => {
  const { logout } = useAuthStore.getState();
  logout();
};

const getUserProfile = async (): Promise<IUserItem> => {
  const data = await request<IUserItem>({
    url: ApiEndpoint.USER, 
    method: HttpMethod.GET,
  });

  return data;
};

export {
  handleAuthError, 
  login, 
  verifyPhoneLogin, 
  verifyPhoneNumber, 
  useRegister, 
  refreshAccessToken,
  registerUser,
  getUserProfile
}


