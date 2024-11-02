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
      alert('회원가입이 완료되었습니다.');
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

      alert('login success!');
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

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const response = await fetchUserInfo();

      setUserInfo(response.userInfo);
    },
    staleTime: 1000 * 60 * 5,
  });
};

// export const useUserInfoQuery = () => {
//   const { setUserInfo } = useUserInfoStore();

//   // useQuery로 사용자 정보를 가져오고 queryFn에서 setUserInfo를 업데이트
//   const { data, error, isLoading } = useQuery({
//     queryKey: ['userInfo'],
//     queryFn: async () => {
//       // fetchUserInfo를 호출하여 데이터를 가져옴
//       const response = await fetchUserInfo();
//       // 데이터를 가져온 후 setUserInfo에 저장
//       setUserInfo(response);
//       // 데이터를 반환하여 useQuery의 data에 저장
//       return response;
//     },
//     staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
//   });

//   return { data, error, isLoading };
// };
