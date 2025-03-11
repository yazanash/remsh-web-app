import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';
import { data } from 'autoprefixer';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [], // Array to hold the product list
    categories: [],
    product: null,
    loading: false, // Flag for loading state
    error: null, // For error messages
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axiosInstance.get('/api/products/'); // Adjust the endpoint to match your API
        this.products = response.data.data; // Assume API returns the product list in `response.data`
      } catch (err) {
        console.error(err);
        this.error = 'Failed to load products.';
      } finally {
        this.loading = false;
      }
    },
    async fetchCategories() {
        try {
          const response = await axiosInstance.get('/api/categories/'); // Replace with category endpoint
          this.categories = response.data.data;
        } catch (err) {
          console.error(err);
          this.error = 'Failed to load categories.';
        }
      },
    async addProduct(productData) {
        this.loading = true;
        this.error = null;
        try {
          const formData = new FormData();
          formData.append('name', productData.name);
          formData.append('category', productData.category);
          formData.append('offer', productData.offer);
          formData.append('price', productData.price);
          formData.append('description', productData.description);
          if (productData.thumbnail) {
            formData.append('thumbnail', productData.thumbnail);
          }
          
          const response = await axiosInstance.post('/api/products/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          this.products.push(response.data);
        } catch (err) {
          console.error(err);
          this.error = 'Failed to add the product.';
        } finally {
          this.loading = false;
        }
    },
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
      this.loading = true;
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
        console.error(err);
        this.error = 'Failed to add the image.';
      } finally {
        this.loading = false;
      }
  },
  async editImage(product_id,imageData) {
    this.loading = true;
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
      this.loading = false;
    }
},
async deleteImage(imageId) {
  this.loading = true;
  this.error = null;
  try {
    const response = await axiosInstance.delete('/api/products/images/delete/'+imageId+'/');
    this.product.images = this.product.images.filter((item) => item.id !== imageId);
  } catch (err) {
    console.log(err);
    this.error = 'Failed to add the image.';
  } finally {
    this.loading = false;
  }
},
async addItem(product_id,formData) {
  this.loading = true;
  this.error = null;
  try {
    const response = await axiosInstance.post('/api/products/'+product_id+'/items/add/', formData);
    console.log(response.data)
    this.product.items.push(response.data.data);
  } catch (err) {
    console.error(err);
    this.error = 'Failed to add the image.';
  } finally {
    this.loading = false;
  }
},

  },
});
