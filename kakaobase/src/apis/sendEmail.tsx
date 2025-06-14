import api from './api';

interface EmailVerification {
  email: string;
  purpose: 'sign-up' | 'password-reset';
}

export default async function sendEmail({ email, purpose }: EmailVerification) {
  try {
    await api.post('/users/email/verification-requests', {
      email,
      purpose,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }
  }
}
