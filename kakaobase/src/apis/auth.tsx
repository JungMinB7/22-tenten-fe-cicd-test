import api from './api';

interface LoginRequest {
  email: string;
  password: string;
}

export default async function login({ email, password }: LoginRequest) {
  try {
    const response = await api.post('/auth/tokens', { email, password });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
