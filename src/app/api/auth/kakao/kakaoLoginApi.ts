import kakaoApiClient from './kakaoApi';

// 카카오 로그인 요청
export const kakaoLogin = async (authCode: string) => {
  const response = await kakaoApiClient.post('/auth/kakao/login', { authCode });
  return response.data; // 백엔드에서 반환한 데이터
};
