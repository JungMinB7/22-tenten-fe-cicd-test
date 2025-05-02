import api from './api';

export default async function verifyCode({ code }: { code: number }) {
  try {
    const response = await api.post('/users/email/verification', { code });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
