import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const axiosInstance = axios.create({
  baseURL: 'https://e-remsh.vercel.app', // Use '/api' to take advantage of the Vite proxy
});
axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.access || localStorage.getItem('access');
  if (token) {
    console.log("getit")
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && error.config && !error.config._retry) {
      const authStore = useAuthStore();
      
      if(authStore.access!==null){
        console.log("access2")
        console.log(authStore.access)
        error.config._retry = true;
        
        await authStore.refreshAccessToken();
        return axios(error.config);

      }
      else{
        console.log("access3")
        return Promise.reject(error);

      }
    }
    
    return Promise.reject(error);
  }
);
export default axiosInstance;