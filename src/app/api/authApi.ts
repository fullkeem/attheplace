import api from './api';

// 회원가입
export interface SignupForm {
  email: string;
  password: string;
  nickname: string;
  profile_image: string;
}

// 회원가입 요청
export const signupUser = async (formData: SignupForm) => {
  const response = await api.post('/member/join', {
    email: formData.email,
    password: formData.password,
    nickname: formData.nickname,
    profile_image: formData.profile_image,
  });
  return response.data;
};

// 로그인
export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user_pk: number;
}

// 로그인 요청
export const loginUser = async (
  loginData: LoginForm
): Promise<LoginResponse> => {
  const response = await api.post('/member/login', {
    email: loginData.email,
    password: loginData.password,
  });
  return response.data;
};

// 로그인한 유저 정보 요청
export const fetchUserInfo = async () => {
  const response = await api.get('/mypage');
  return response.data || { nickname: '', profile_image: '', likeList: [] };
};
