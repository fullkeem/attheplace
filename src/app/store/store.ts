import { create } from 'zustand';

/** 진행바 */
interface Progress {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const useProgressBarStore = create<Progress>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
}));

/** 유저 정보 */
interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
}

interface UserStore {
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useUserInfoStore = create<UserStore>((set) => ({
  userInfo: null,
  setUserInfo: (user) => set({ userInfo: user }),
  clearUserInfo: () => set({ userInfo: null }),
}));
