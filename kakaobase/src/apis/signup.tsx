import api from './api';

interface LoginRequest {
  email: string;
  password: string;
  name: string;
  nickname: string;
  class_name: string;
  github_url: string;
}

export default async function signup({
  email: string,
  password,
  name,
  nickname,
  class_name,
  github_url,
}: LoginRequest) {
  try {
    const response = await api.post('/users', {
      email: string,
      password,
      name,
      nickname,
      class_name,
      github_url,
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
