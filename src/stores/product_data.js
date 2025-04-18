import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useProductDataStore = defineStore('product_data', {
  state: () => ({
    product: null,
    loading: false, // Flag for loading state
    imageloading: false,
    imagedeleteloading: false,
    itemdeleteloading:false,
    itemloading: false,
    itemchangeloading: false,
    error: null, // For error messages
  }),
  actions: {
    async fetchProductById(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.get('/api/products/'+id+'/'); // API endpoint for fetching product
        
        this.product = response.data.data; // Assign the fetched product to the state
      } catch (err) {
        console.error(err);
        this.error = 'Failed to load product details.';
      } finally {
        this.loading = false;
      }
    },
    async addImage(product_id,imageData) {
      this.imageloading = true;
      this.error = null;
      try {
        const formData = new FormData();
        if (imageData.image) {
          formData.append('image_url', imageData.image);
          formData.append('product', product_id);
        }
        
        const response = await axiosInstance.post('/api/products/images/add/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data)
        this.product.images.push(response.data.data);
      } catch (err) {
        if(error.response.status===400){
          console.log(error.response.status)
          throw new Error("خطأ في البيانات");}
      } finally {
        this.imageloading = false;
      }
  },
  async editImage(product_id,imageData) {
    this.imageloading = true;
    this.error = null;
    try {
      const formData = new FormData();
      if (imageData.image) {
        formData.append('image_url', imageData.image);
        formData.append('product', product_id);
      }
      
      const response = await axiosInstance.put('/api/products/images/edit/'+imageData.id+'/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // data = ;
      console.log(response.data.data)
      const itemToUpdate = this.product.images.find((item) => item.id === response.data.data.id); // Find the item
  if (itemToUpdate) {
    itemToUpdate.image_url = response.data.data.image_url; // Update its property
  }
    } catch (err) {
      if(error.response.status===400){
        console.log(error.response.status)
        throw new Error("خطأ في البيانات");}
    } finally {
      this.imageloading = false;
    }
},
async deleteImage(imageId) {
  this.imagedeleteloading = true;
  this.error = null;
  try {
    const response = await axiosInstance.delete('/api/products/images/delete/'+imageId+'/');
    this.product.images = this.product.images.filter((item) => item.id !== imageId);
  } catch (err) {
    if(error.response.status===400){
      console.log(error.response.status)
      throw new Error("خطأ في البيانات");}
  } finally {
    this.imagedeleteloading = false;
  }
},
async addItem(product_id,formData) {
  this.itemloading = true;
  this.error = null;
  try {
    const response = await axiosInstance.post('/api/products/'+product_id+'/items/add/', formData);
    console.log(response.data)
    this.product.items.push(response.data.data);
  } catch (err) {
    if(error.response.status===400){
      console.log(error.response.status)
      throw new Error("خطأ في البيانات");}
  } finally {
    this.itemloading = false;
  }
},
async activateItem(item_id,status_bool) {
  this.itemchangeloading = true;
  this.error = null;
  try {
    const response = await axiosInstance.put('/api/products/items/change/'+item_id+'/', {status:status_bool});
    console.log(response.data)
    const itemToUpdate = this.product.items.find((item) => item.id === response.data.data.id);
    if (itemToUpdate) {
      itemToUpdate.is_active = response.data.data.status; // Update its property
    }
  } catch (err) {
    if(error.response.status===400){
      console.log(error.response.status)
      throw new Error("خطأ في البيانات");}
  } finally {
    this.itemchangeloading = false;
  }
},
async deleteItem(item_id) {
    this.itemdeleteloading = true;
    this.error = null;
    try {
      const response = await axiosInstance.delete('/api/products/items/delete/'+item_id+'/');
      this.product.items = this.product.items.filter((item) => item.id !== item_id);
    } catch (err) {
      if(error.response.status===400){
        console.log(error.response.status)
        throw new Error("خطأ في البيانات");}
    } finally {
      this.itemdeleteloading = false;
    }
  },

  },
});
