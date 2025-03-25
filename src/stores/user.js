import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    loading: false,
    users:[],
    error: null, 
    add_error: null, 
    loadingoperation:false
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
    async AddToGroup(form) {
      this.loadingoperation = true;
      this.add_error = null;
      try {
        const itemToUpdate = this.users.find((item) => item.email === form.email); // Find the item
        if (itemToUpdate) {
          this.add_error="هذا المستخدم مضاف مسبقا"
        }else{
          const response = await axiosInstance.post('/api/admins/add/',form); 
          console.log(response.data)
          this.users.push(response.data.data)
        }
       
      } catch (err) {
        console.log(err);
        this.add_error = 'خطأ في البريد الالكتروني او المجموعة';

      } finally {
        this.loadingoperation = false;
      }
    },
    async changeGroup(user_id,form) {
      this.loadingoperation = true;
      this.error = null;
      try {

        const response = await axiosInstance.put('/api/admins/change/'+user_id+'/',form); 
        console.log(response.data)
        const itemToUpdate = this.users.find((item) => item.id === response.data.data.id); // Find the item
        if (itemToUpdate) {
          itemToUpdate.group = response.data.data.group; // Update its property
        }
      } catch (err) {
        console.log(err);
        this.error = 'Failed to load products.';
      } finally {
        this.loadingoperation = false;
      }
    },
    async removeFromGroup(user_id) {
      
      try {

        const response = await axiosInstance.delete('/api/admins/remove/'+user_id+'/'); 
        console.log(response.data)
        this.users = this.users.filter((item) => item.id !== user_id);
      } catch (err) {
        console.log(err);
        throw new Error("خطأ في حذف المستخدم")
      }
    },
  },
  
});
