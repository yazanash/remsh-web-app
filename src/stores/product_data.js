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
        console.log(err);
        this.error = 'Failed to add the image.';
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
      console.log(err);
      this.error = 'Failed to add the image.';
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
    console.log(err);
    this.error = 'Failed to add the image.';
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
    console.error(err);
    this.error = 'Failed to add the image.';
  } finally {
    this.itemloading = false;
  }
},
async deleteItem(item_id) {
    this.itemdeleteloading = true;
    this.error = null;
    try {
      const response = await axiosInstance.delete('/api/products/items/delete/'+item_id+'/');
      this.product.items = this.product.items.filter((item) => item.id !== item_id);
    } catch (err) {
      console.log(err);
      this.error = 'Failed to add the image.';
    } finally {
      this.itemdeleteloading = false;
    }
  },

  },
});
