import { create } from 'zustand';

export interface UserState {
  userId: number;
  email: string;
  name: string;
  nickname: string;
  course: string;
  githubUrl: string;
  profileImageUrl: string;
  autoLogin: boolean;
  setUserInfo: (user: Partial<UserState>) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: 0,
  email: '',
  name: '',
  nickname: '',
  course: '',
  githubUrl: '',
  profileImageUrl: '',
  autoLogin: false,
  setUserInfo: (user) => set((state) => ({ ...state, ...user })),
  reset: () =>
    set({
      userId: 0,
      email: '',
      name: '',
      nickname: '',
      course: '',
      githubUrl: '',
      profileImageUrl: '',
      autoLogin: false,
    }),
}));
