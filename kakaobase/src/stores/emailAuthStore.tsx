import { create } from 'zustand';

interface EmailAuthState {
  email: string;
  code: string;
  isVerified: boolean;
  verificationAttempts: number;
  setEmail: (email: string) => void;
  setCode: (code: string) => void;
  setVerified: (status: boolean) => void;
  incrementAttempt: () => void;
  resetAttempts: () => void;
  reset: () => void;
}

export const useAuthStore = create<EmailAuthState>((set) => ({
  email: '',
  code: '',
  isVerified: false,
  verificationAttempts: 0,
  setEmail: (email) => set({ email }),
  setCode: (code) => set({ code }),
  setVerified: (status) => set({ isVerified: status }),
  incrementAttempt: () =>
    set((state) => ({ verificationAttempts: state.verificationAttempts + 1 })),
  resetAttempts: () => set({ verificationAttempts: 0 }),
  reset: () =>
    set({
      email: '',
      code: '',
      isVerified: false,
      verificationAttempts: 0,
    }),
}));
