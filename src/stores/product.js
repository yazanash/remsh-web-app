import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';
import { data } from 'autoprefixer';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [], // Array to hold the product list
    categories: [],
    product: null,
    loading: false,
    error: null, 
    pagination: {
      next: null,    // Next page URL
      previous: null, // Previous page URL
    },
  }),
  actions: {
    async fetchProducts(filters=null,operation=null) {
      this.loading = true;
      this.error = null;
      try {
        const filter = {
          params: {},
        };
        if(filters){
          if (filters.category) {
            filter.params.category = filters.category;
          }
          
          if (filters.search) {
            filter.params.keyword = filters.search;
          }
          
          if (filters.keyword) {
            filter.params.keyword = filters.keyword; // For keyword-based filtering
          }
          if(operation){
            if(this.pagination.next!==null&&operation==='next'){
              filter.params.page =this.pagination.next
            }
            else if (this.pagination.previous!==null&&operation==='previous'){
              filter.params.page =this.pagination.previous
            }
          }
        }
       
       
        const response = await axiosInstance.get('/api/products/',filter); // Adjust the endpoint to match your API
        this.products = response.data.data; // Assume API returns the product list in `response.data
        console.log( response.data)
        this.pagination.next = response.data.next_page;
        this.pagination.previous = response.data.previous_page;
      } catch (err) {
        console.log(err);
        this.error = 'Failed to load products.';
      } finally {
        this.loading = false;
      }
    },
    async fetchCategories() {
        try {
          this.loading=true;
          const response = await axiosInstance.get('/api/categories/'); // Replace with category endpoint
          this.categories = response.data.data;
         
        } catch (err) {
          console.error(err);
          this.error = 'Failed to load categories.';
        }
        finally{
          this.loading=false;
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
          this.products.push(response.data.data);
          console.log(response.data.data)
          return response.data.data.id
        } catch (err) {
          console.log(err);
          this.error = 'Failed to add the product.';
        } finally {
          this.loading = false;
        }
    },
    async editProduct(product_id,productData) {
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
        
        const response = await axiosInstance.put('/api/products/'+product_id+'/edit/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
      } catch (err) {
        console.log(err);
        this.error = 'Failed to add the product.';
      } finally {
        this.loading = false;
      }
  },
  },
});
