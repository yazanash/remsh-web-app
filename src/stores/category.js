import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [], // Array to hold the product list
    loading: false,
    loadingdelete: false,
    loadingoperation: false,
    error: null, 
  }),
  actions: {
    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
       
        const response = await axiosInstance.get('/api/categories/'); 
        this.categories = response.data.data; 
        console.log( response.data)
      } catch (err) {
        console.log(err);
        this.error = 'خطأ في تحميل الفئات';
      } finally {
        this.loading = false;
      }
    },
    async addCategory(formData) {
        this.loadingoperation = true;
        this.error = null;
        try {
          const response = await axiosInstance.post('/api/categories/create/', formData);
          console.log(response.data)
          this.categories.push(response.data.data);
        } catch (err) {
          if(error.response.status===400){
            console.log(error.response.status)
            throw new Error("خطأ في البيانات");
          }
        } finally {
          this.loadingoperation = false;
        }
      },
      async editCategory(category_id,formData) {
        this.loadingoperation = true;
        this.error = null;
        try {
          const response = await axiosInstance.put('/api/categories/'+category_id+'/edit/', formData);
          console.log(response.data)
          const itemToUpdate = this.categories.find((item) => item.id === response.data.data.id); // Find the item
          if (itemToUpdate) {
            itemToUpdate.name = response.data.data.name; // Update its property
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
