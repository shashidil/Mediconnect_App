import axios from 'axios';
import { BASE_URL } from '../Constants/Index';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem('user');
    let user = null;
    if (userStr) user = JSON.parse(userStr);

    if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
