import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useDeliveryStore = defineStore('delivery', {
  state: () => ({
    deliveries: [], // Array to hold the product list
    loading: false,
    loadingdelete: false,
    loadingoperation: false,
    error: null, 
  }),
  actions: {
    async fetchDelivery() {
      this.loading = true;
      this.error = null;
      try {

        const response = await axiosInstance.get('/api/delivery/'); 
        this.deliveries = response.data.data; 
        console.log(response.data);
      } catch (err) {
        console.log(err);
        this.error = 'خطأ في عرض مكاتب الشحن';
      } finally {
        this.loading = false;
      }
    },
    async addDelivery(formData) {
        this.loadingoperation = true;
        this.error = null;
        try {
          const response = await axiosInstance.post('/api/delivery/create/', formData);
          this.deliveries.push(response.data.data);
        } catch (err) {
          if(error.response.status===400){
            console.log(error.response.status)
            throw new Error("خطأ في البيانات");}
        } finally {
          this.loadingoperation = false;
        }
      },
      async editDelivery(delivery_id,formData) {
        this.loadingoperation = true;
        this.error = null;
        try {
          const response = await axiosInstance.put('/api/delivery/'+delivery_id+'/edit/', formData);
          const itemToUpdate = this.deliveries.find((item) => item.id === response.data.data.id); // Find the item
          if (itemToUpdate) {
            itemToUpdate.name = response.data.data.name; // Update its property
            itemToUpdate.address = response.data.data.address; // Update its property
          }
        } catch (err) {
          if(error.response.status===400){
            console.log(error.response.status)
            throw new Error("خطأ في البيانات");}
        } finally {
          this.loadingoperation = false;
        }
      },
      
  },
});
