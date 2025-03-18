import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    loading: false,
    stats:[],
    error: null, 
  }),
  actions: {
    async fetchStats() {
      this.loading = true;
      this.error = null;
      try {

        const response = await axiosInstance.get('/api/stats/'); 
        console.log(response.data)
        this.stats=response.data.data
      } catch (err) {
        console.log(err);
        this.error = 'Failed to load products.';
      } finally {
        this.loading = false;
      }
    },
  },
  
});
