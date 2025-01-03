import api from '../../api';

// 카카오 로그인 요청
export const kakaoLogin = async (authCode: string) => {
  const response = await api.post('/member/kakao/login', {
    authCode,
  });
  return response.data; // 백엔드에서 반환한 데이터
};
