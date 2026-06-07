interface RegisterRequest {
  name: string;
  email: string;
}
interface RegisterResponse {
  isRegistered: boolean;
  token : string;
}

interface VerifyRequest {
  code: string;
}

interface VerifyResponse {
  token: string;
  refresh_token: string;
}

interface LoginRequest {
  email: string;
}

interface LoginResponse {
  isLogged : boolean;
  token : string;
}

interface UpdateProfileRequest {
  name: string;
  phone?: string;
}

export type {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
  RegisterResponse,
  VerifyResponse,
  VerifyRequest,
  UpdateProfileRequest,
}
