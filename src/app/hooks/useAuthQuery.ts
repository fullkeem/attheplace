import { AxiosError } from 'axios';
import { useAuthStore } from '../store/authStore';
import { useUserInfoStore } from '../store/authStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  LoginForm,
  loginUser,
  signupUser,
  LoginResponse,
  fetchUserInfo,
} from '../api/authApi';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log('회원가입 성공:', data);
    },
    onError: (error: AxiosError) => {
      console.error('회원가입에 실패했습니다.', error);
    },
  });
};

export const useLoginMutation = () => {
  const { setUserInfo } = useUserInfoStore();
  const { clearLoginData } = useAuthStore();

  return useMutation<LoginResponse, AxiosError, LoginForm>({
    mutationKey: ['userInfo'],
    mutationFn: loginUser,
    onSuccess: async (data) => {
      // 토큰을 localStorage에 저장
      localStorage.setItem('token', data.token);
      // 사용자 정보 가져오기
      const response = await fetchUserInfo();
      setUserInfo(response.userInfo);
      clearLoginData();
    },
    onError: (error) => {
      console.error('로그인에 실패했습니다.', error);
    },
  });
};

// 유저 정보 Query 훅
export const useUserInfoQuery = () => {
  const { setUserInfo } = useUserInfoStore();

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      if (!token) {
        return { nickname: '', profile_image: '', likeList: [] };
      }

      const response = await fetchUserInfo();
      setUserInfo(response.userInfo);
      return response.userInfo;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });
};
