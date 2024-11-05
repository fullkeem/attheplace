import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface LoginForm {
  email: string;
  password: string;
}

interface AuthStore {
  loginData: LoginForm;
  setLoginData: (field: keyof LoginForm, value: string) => void;
  clearLoginData: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  loginData: {
    email: '',
    password: '',
  },
  setLoginData: (field, value) =>
    set((state) => ({
      loginData: {
        ...state.loginData,
        [field]: value,
      },
    })),
  clearLoginData: () => set({ loginData: { email: '', password: '' } }),
}));

/** 유저 정보 */
export interface UserLikeList {
  cafe_id: number;
  cafe_name: string;
  cafe_image: string;
  opening_hours: string;
  contact_number: string;
  location_address: string;
}
export interface UserInfo {
  nickname: string;
  profile_image: string;
  likeList: UserLikeList[];
}

interface UserStore {
  userInfo: UserInfo;
  setUserInfo: (user: UserInfo) => void;
  clearUserInfo: () => void;
  addLikeList: (cafe: UserLikeList) => void;
  removeLikeList: (id: number) => void;
}
export const useUserInfoStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: { nickname: '', profile_image: '', likeList: [] },
      setUserInfo: (user) => set({ userInfo: user }),
      addLikeList: (cafe) =>
        set((state) => ({
          userInfo: {
            ...state.userInfo,
            likeList: [...state.userInfo.likeList, cafe],
          },
        })),
      removeLikeList: (id) =>
        set((state) => ({
          userInfo: {
            ...state.userInfo,
            likeList: state.userInfo.likeList.filter(
              (cafe) => cafe.cafe_id !== id
            ),
          },
        })),
      clearUserInfo: () =>
        set({ userInfo: { nickname: '', profile_image: '', likeList: [] } }),
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
