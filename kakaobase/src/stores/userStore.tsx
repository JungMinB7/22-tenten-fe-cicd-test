import { create } from 'zustand';

export interface UserState {
  userId: string;
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
  userId: '',
  email: '',
  name: '',
  nickname: '',
  course: '',
  githubUrl: '',
  profileImageUrl: '',
  autoLogin: false,
  setUserInfo: (user) => set((state) => ({ ...state, ...user })),
  reset: () =>
    //로그아웃 때 사용하는 함수
    set({
      userId: '',
      email: '',
      name: '',
      nickname: '',
      course: '',
      githubUrl: '',
      profileImageUrl: '',
      autoLogin: false,
    }),
}));
