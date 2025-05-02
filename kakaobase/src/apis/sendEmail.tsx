import api from './api';

export default async function sendEmail({ email }: { email: string }) {
  try {
    const response = await api.post('/users/email/verification-requests', {
      email,
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
