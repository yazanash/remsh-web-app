import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const axiosInstance = axios.create({
  baseURL: '/api', // Use '/api' to take advantage of the Vite proxy
  timeout: 10000, // Optional timeout setting
});
axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.access || localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(response.response)
    if (error.response.status === 401 && error.config && !error.config._retry) {
      error.config._retry = true;
      
      const authStore = useAuthStore();
      await authStore.refreshAccessToken();
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;