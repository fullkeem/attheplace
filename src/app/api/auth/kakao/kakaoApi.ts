import axios from 'axios';

const kakaoApiClient = axios.create({
  baseURL: 'http://localhost:3003',
  headers: {
    'Content-Type': 'application/json',
  },
});

kakaoApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

kakaoApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리 로직 추가 (예: 401 상태 코드 처리)
    console.error('API 응답 에러:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default kakaoApiClient;
