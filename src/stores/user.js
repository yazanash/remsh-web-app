import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    users:[],
    error: null, 
  }),
  actions: {
    async fetchAdminUsers() {
      this.loading = true;
      this.error = null;
      try {

        const response = await axiosInstance.get('/api/get-admins/'); 
        console.log(response.data)
        this.users=response.data.data
      } catch (err) {
        console.log(err);
        this.error = 'Failed to load products.';
      } finally {
        this.loading = false;
      }
    },
  },
  
});
