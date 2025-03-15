import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [], // Array to hold the product list
    order: null,
    loading: false,
    changestatusloading: false,
    error: null, 
    pagination: {
      next: null,    // Next page URL
      previous: null, // Previous page URL
    },
  }),
  actions: {
    async fetchOrders(filters=null,operation=null) {
      this.loading = true;
      this.error = null;
      try {
        const filter = {
          params: {},
        };
        if(filters){
          if (filters.status) {
            filter.params.status = filters.status;
          }
          
          if (filters.search) {
            filter.params.user = filters.search;
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
       
       
        const response = await axiosInstance.get('/api/orders/get-all/',filter); 
        this.orders = response.data.data; 
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
     async fetchOrderById(id) {
          this.loading = true;
          this.error = null;
    
          try {
            const response = await axiosInstance.get('/api/orders/get/'+id+'/'); // API endpoint for fetching product
            console.log(response.data)
            this.order = response.data.data; // Assign the fetched product to the state
          } catch (err) {
            console.error(err);
            this.error = 'Failed to load product details.';
          } finally {
            this.loading = false;
          }
        },
        async changeOrderStatus(order_id,form) {
              this.changestatusloading = true;
              this.error = null;
              try {
                
                const response = await axiosInstance.put('/api/orders/status/'+order_id+'/', form);
                this.order.status = response.data.data.status
              } catch (err) {
                console.log(err);
                this.error = 'Failed to add the product.';
              } finally {
                this.changestatusloading = false;
              }
          },
  },
});
