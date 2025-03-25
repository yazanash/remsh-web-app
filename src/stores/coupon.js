import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useCouponStore = defineStore('coupon', {
  state: () => ({
    coupons: [], // Array to hold the product list
    loading: false,
    loadingdelete: false,
    loadingoperation: false,
    error: null, 
  }),
  actions: {
    async fetchCoupons() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axiosInstance.get('/api/coupons/'); 
        this.coupons = response.data.data; 
        console.log( response.data)
      } catch (err) {
        console.log(err);
        this.error = 'خطأ في تحميل الكوبونات';
      } finally {
        this.loading = false;
      }
    },
    async addCoupon(formData) {
        this.loadingoperation = true;
        this.error = null;
        try {
          const localDate = new Date(formData.expire); // Create Date object in local time
          formData.expire = localDate.toISOString();
          const response = await axiosInstance.post('/api/coupons/create/', formData);
          console.log(response.data)
          this.coupons.push(response.data.data);
        } catch (err) {
          if(error.response.status===400){
            console.log(error.response.status)
            throw new Error("خطأ في البيانات");}
        } finally {
          this.loadingoperation = false;
        }
      },
      async editCoupon(coupon_id,formData) {
        this.loadingoperation = true;
        this.error = null;
        try {
          const localDate = new Date(formData.expire); // Create Date object in local time
          formData.expire = localDate.toISOString();
          const response = await axiosInstance.put('/api/coupons/'+coupon_id+'/edit/', formData);
          console.log(response.data)
          const itemToUpdate = this.coupons.find((item) => item.id === response.data.data.id); // Find the item
          if (itemToUpdate) {
            itemToUpdate.code = response.data.data.code; 
            itemToUpdate.percent = response.data.data.percent;
            itemToUpdate.expire = response.data.data.expire;
            itemToUpdate.count = response.data.data.count;
          }
        } catch (err) {
          if(error.response.status===400){
            console.log(error.response.status)
            throw new Error("خطأ في البيانات");}
        } finally {
          this.loadingoperation = false;
        }
      },
      async deleteCoupon(coupon_id) {
        this.loadingdelete = true;
        this.error = null;
        try {
          const response = await axiosInstance.delete('/api/coupons/'+coupon_id+'/delete/');
          this.coupons = this.coupons.filter((item) => item.id !== coupon_id);
        } catch (err) {
          if(error.response.status===404){
            throw new Error("هذا المنتج غير موجود");}
        } finally {
          this.loadingdelete = false;
        }
      },
  },
});
