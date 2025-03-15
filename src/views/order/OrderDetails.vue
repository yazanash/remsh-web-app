
<script setup>
import OrderProductItem from '@/components/order/OrderProductItem.vue'

import {ref,reactive,onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { useOrderStore } from '@/stores/order';

const router = useRoute();
const orderId = router.params.id;
const orderStore = useOrderStore();


const form = reactive({
    status:null
});

const getStatusName=(status)=>{
    const statusMap = {
        P: "Pending",
        PR: "Processing",
        S: "Shipped",
        C: "Canceled",
        D: "Delivered"
      };
      return statusMap[status] || "Unknown";
}
const getBadgeClass=(status) => {
      const badgeClasses = {
        P: "bg-secondary text-white w-70", // Yellow for Pending
        PR: "bg-warning text-dark w-70", // Blue for Processing
        S: "bg-primary text-white w-70", // Dark Blue for Shipped
        C: "bg-danger text-white w-70", // Red for Canceled
        D: "bg-success text-white w-70" // Green for Delivered
      };
      return badgeClasses[status] || "bg-secondary text-white"; // Default (Unknown)
    }
    const handleChangeStatus = async () => {
  try {
    await orderStore.changeOrderStatus(orderId,form);
  } catch (err) {
    console.error('Error adding product:', err);
  }
};
onMounted(async() => { 
    console.log("mounted")
  await orderStore.fetchOrderById(orderId); 
  form.status=orderStore.order?.status
});


</script>

<template>
    <main class="container p-3 ">
        <div class="row mb-3">
            <div class="col-md-12 card mb-3">
                <div class="row g-0">
                    <div class="col-md-12">
                    <div class="card-body">
                      
                        
                        <div class="row mt-3">
                            <div class="col-md ">
                                <h5 class="card-title"><i class="pi pi-user"></i> {{orderStore.order?.user.name}}</h5>
                                <p class="card-text"><i class="pi pi-phone"></i> {{orderStore.order?.user.phone}}</p>
                            </div>
                        
                            <div class="col-md">
                                <p class="card-text"><i class="pi pi-truck"></i>  <span class="badge" :class="getBadgeClass(orderStore.order?.status)">
                                    {{ getStatusName(orderStore.order?.status) }}
                                </span></p>
                                <p><i class="pi pi-box"></i> {{orderStore.order?.delivery_office}}</p>
                            </div>
                            <div class="col-md">
                                <p class="card-text"><i class="pi pi-tag"></i> {{orderStore.order?.coupon || "no coupon"}}</p>
                                <h4><i class="pi pi-dollar"></i> {{orderStore.order?.total}}</h4>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </div>
        <div class="row">
            <form @submit.prevent="handleChangeStatus" class="row g-3 mb-3">
                <div class="col-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Status</span>
                        <select v-model="form.status" class="form-select" aria-label="Default select example">
                            <option value="P">Pending</option>
                            <option value="PR">Processing</option>
                            <option value="S">Shipped</option>
                            <option value="D">Deliverd</option>
                            <option value="C">Canceled</option>
                        </select>
                    </div>
                </div>
                <div class="col">
                    <button :disabled="orderStore.changestatusloading||!form.status" type="submit" class="btn btn-primary">
                        <span v-if="orderStore.changestatusloading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Change status
                    </button>
                </div>
            </form>
            <div class="col-md-12 col-sm-12">
                <div class="border table-responsive rounded p-1">
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">image</th>
                            <th scope="col">name </th>
                            <th scope="col">Size</th>
                            <th scope="col">Color</th>
                            <th scope="col">Price </th>
                            <th scope="col">Offer </th>
                            <th scope="col">Count</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <OrderProductItem v-for="item in orderStore.order?.order_items" :key="item.id" :item="item"></OrderProductItem>
                    </tbody>
                </table>
            </div>
            </div>
            
        </div>
      
       
      </main>
</template>