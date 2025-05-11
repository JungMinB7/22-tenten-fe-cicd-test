import { create } from 'zustand';

interface SignupStep1Data {
  email: string;
  password: string;
}

interface SignupStep2Data {
  name: string;
  nickname: string;
  course: string;
  githubUrl: string;
}

interface SignupStore {
  step1: SignupStep1Data | null;
  step2: SignupStep2Data | null;
  setStep1: (data: SignupStep1Data) => void;
  setStep2: (data: SignupStep2Data) => void;
  clear: () => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  step1: null,
  step2: null,
  setStep1: (data) => set({ step1: data }),
  setStep2: (data) => set({ step2: data }),
  clear: () => set({ step1: null, step2: null }),
}));
