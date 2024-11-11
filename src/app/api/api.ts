import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3003',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (!config.headers.Authorization) {
      config.headers = {
        Authorization: token,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
