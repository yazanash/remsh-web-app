import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    access: null,
    refresh: null,
    group: null,
    profile: null,
    registerErroMessage:'',
    operation_loading: false
  }),
  actions: {
    async register(email, password,password2) {
      try{
        this.operation_loading = true;
      const response = await axiosInstance.post('/api/signup/', { email, password, password2 });
      this.access = response.data.access;
      this.refresh = response.data.refresh;
      this.group = response.data.user.group; // Optionally store user info
      localStorage.setItem('group', this.group);
      localStorage.setItem('access', this.access);
      localStorage.setItem('refresh', this.refresh);
    }
      catch(error){
        
        if(error.response.status===400){
          console.log(error.response)
          throw new Error("خطأ في اسم المستخدم او كلمة المرور ");
        }
      }
      finally{
        this.operation_loading = false;
      }
    },
    async login(email, password) {
      try{
        this.operation_loading = true;
        const response = await axiosInstance.post('/api/login/', { email, password });
        
        this.access = response.data.access;
        this.refresh = response.data.refresh;
        this.user = { email }; // Optionally store user info
        this.group = response.data.user.group; // Optionally store user info
        localStorage.setItem('group', this.group);
        localStorage.setItem('access', this.access);
        localStorage.setItem('refresh', this.refresh);
    }
    catch(error){
      if(error.response.status===400||error.response.status===401){
        console.log(error.response.status)
        throw new Error("خطأ في البيانات");
      }
    }
    finally{
      this.operation_loading = false;
    }
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
    async getProfile() {
      try {
        const response = await axiosInstance.get('/api/customer/profile/');
        console.log(response.data)
        this.profile = response.data.data;
      } catch (error) {
        console.log('Failed to refresh token:');
      }
    },
    async setProfile(form) {
      try {
        const response = await axiosInstance.post('/api/customer/profile/', form);
        this.profile = response.data.data;
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    },
    async updateProfile(form) {
      try {
        const response = await axiosInstance.put('/api/customer/profile/', form);
        this.profile = response.data.data;
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