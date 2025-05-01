import { create } from 'zustand';

interface EmailAuthState {
  email: string;
  isVerified: boolean;
  verificationAttempts: number;
  setEmail: (email: string) => void;
  setVerified: (status: boolean) => void;
  incrementAttempt: () => void;
  resetAttempts: () => void;
}

export const useAuthStore = create<EmailAuthState>((set) => ({
  email: '',
  isVerified: false,
  verificationAttempts: 0,
  setEmail: (email) => set({ email }),
  setVerified: (status) => set({ isVerified: status }),
  incrementAttempt: () =>
    set((state) => ({ verificationAttempts: state.verificationAttempts + 1 })),
  resetAttempts: () => set({ verificationAttempts: 0 }),
}));
