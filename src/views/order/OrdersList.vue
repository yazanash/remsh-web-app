<script setup>
import OrderItem from '@/components/order/OrderItem.vue';
import { reactive, ref, computed } from 'vue';
import { onMounted } from 'vue';
import { useOrderStore } from '@/stores/order';

const orderStore = useOrderStore();

const form = reactive({
  search: null,
  status:null,
});

const handleProductsFilter =async()=>{
    await orderStore.fetchOrders(form);
}
const handleProductsPages =async(operation =null)=>{
    await orderStore.fetchOrders(form,operation);
}
const handleClear = async() => {
      form.search=null;
      form.status=null
        await orderStore.fetchOrders(form);
    };
onMounted(async () => {
  await orderStore.fetchOrders(); // Fetch products when the component is mounted
});
</script>

<template>
<div class="container p-3">
<div class="d-flex flex-row justify-content-between">
        <h3>Orders</h3>
    </div>
    
<hr/>
    <form @submit.prevent="handleProductsFilter" class="row g-3 my-1">
        <div class="col-4 ">
                <div class="input-group">
                    <div class="input-group-text"><i class="pi pi-filter"></i></div>
                    <select v-model="form.status" class="form-select" aria-label="Default select example">
                        <option :selected="true" :value="null">Status</option>
                        <option value="P">Pending</option>
                        <option value="PR">Processing</option>
                        <option value="S">Shipped</option>
                        <option value="D">Deliverd</option>
                        <option value="C">Canceled</option>
                    </select>
                </div>
              
        </div>
        <div class="col-6">
            <div class="d-flex">
                <div class="input-group mb-3">
                    <input class="form-control" v-model="form.search" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-primary"  type="submit"><i class="pi pi-search"></i></button>
                </div>
            </div>
        </div>
        <div class="col-2">
            <div class="d-flex">
                <div class="input-group mb-3">
                     <a class="btn btn-primary" @click="handleClear" :class="{'disabled':!form.category&&!form.search}" type="submit">Clear</a>
                </div>
            </div>
        </div>
    </form>
    <div v-if="orderStore.loading">Loading...</div>
    <div v-if="orderStore.error">{{ orderStore.error }}</div>
<div v-if="!orderStore.loading && !orderStore.error"  class="row">
            <div class="col-md-12 col-sm-12">
                <div class="border table-responsive rounded p-1">
                    
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer</th>
                            <th class="text-center" scope="col">Status</th>
                            <th scope="col">Delivery Office</th>
                            <th scope="col">items</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <OrderItem v-for="order in orderStore.orders" :key="order.id" :order="order"/>
                    </tbody>
                </table>
                <div class="d-flex flex-row justify-content-center align-items-center">
                    <button @click="handleOrderssPages('previous')" :disabled="!orderStore.pagination.previous" class="btn btn-primary mx-1">Previous</button>
                    <button @click="handleOrderssPages('next')" :disabled="!orderStore.pagination.next" class="btn btn-primary mx-1">Next</button>
                </div>
                
            </div>
            </div>
        </div>
    </div>
</template>