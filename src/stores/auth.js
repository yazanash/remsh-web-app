import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    access: null,
    refresh: null,
    group: null,
  }),
  actions: {
    async register(email, password,password2) {
      const response = await axiosInstance.post('/api/register/', { email, password, password2 });
      this.access = response.data.access;
      this.refresh = response.data.refresh;
      this.user = { email }; // Optionally store user info
      localStorage.setItem('access', this.access);
      localStorage.setItem('refresh', this.refresh);
    },
    async login(email, password) {
      const response = await axiosInstance.post('/api/login/', { email, password });
      this.access = response.data.access;
      this.refresh = response.data.refresh;
      this.user = { email }; // Optionally store user info
      localStorage.setItem('access', this.access);
      localStorage.setItem('refresh', this.refresh);
    },
    async verifyToken() {
      try {
         await axiosInstance.post('/api/token/verify/', { token: this.access });
        return true;
      }  catch (error) {
        console.error('Failed to verify token:', error);
      
      }
    },
    async refreshAccessToken() {
      try {
        const response = await axiosInstance.post('/api/token/access/', { refresh: this.refresh });
        this.access = response.data.access;
        localStorage.setItem('access', this.access);
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    },
    async getUserGroup() {
      try {
        const response = await axiosInstance.get('/api/user-group/');
        this.group = response.data.data.group;
        localStorage.setItem('group', this.group);
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    },
    logout() {
      this.user = null;
      this.access = null;
      this.refresh = null;
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
  },
});