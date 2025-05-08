import api from './api';

interface SignupRequest {
  email: string;
  password: string;
  name: string;
  nickname: string;
  class_name: string;
  github_url: string;
}

export default async function signup(payload: SignupRequest): Promise<void> {
  try {
    await api.post('/users', payload);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e.message;
    }
  }
}
