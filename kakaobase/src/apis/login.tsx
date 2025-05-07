import api from './api';

interface LoginRequest {
  email: string;
  password: string;
  device_id: string;
  user_agent: string;
}

interface LoginResponse {
  message: string;
  data: {
    access_token: string;
    class_name: string;
    nickname: string;
  };
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await api.post('/auth/tokens', payload);
  return response.data;
}

export async function refreshLogin() {
  const response = await api.post('auth/tokens/refresh');
  return response.data;
}
