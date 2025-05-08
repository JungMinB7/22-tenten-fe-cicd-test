import api from './api';

interface codeVerification {
  email: string;
  code: string;
}

export default async function verifyCode({ email, code }: codeVerification) {
  try {
    await api.post('/users/email/verification', { email, code });
  } catch (e: unknown) {
    if (e instanceof Error) throw e.message;
  }
}
