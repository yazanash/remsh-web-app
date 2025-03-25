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
<div class="container p-3 rounded bg-white">
<div class="d-flex flex-row justify-content-between">
        <h3>الطلبات</h3>
    </div>
    
<hr/>
    <form @submit.prevent="handleProductsFilter" class="row g-3 my-1">
        <div class="col-4 ">
                <div class="input-group">
                    <div class="input-group-text"><i class="pi pi-filter"></i></div>
                    <select v-model="form.status" class="form-select" aria-label="Default select example">
                        <option :selected="true" :value="null">الحالة</option>
                        <option value="P">قيد الانتظار</option>
                        <option value="PR">قيد التجهيز</option>
                        <option value="S">تم الشحن</option>
                        <option value="D">تم التوصيل</option>
                        <option value="C">تم الالغاء</option>
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
    <div v-if="orderStore.loading">
        <div class="d-flex justify-content-center align-items-center">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-if="orderStore.error">{{ orderStore.error }}</div>
<div v-if="!orderStore.loading && !orderStore.error"  class="row">
            <div class="col-md-12 col-sm-12">
                <div class="border table-responsive rounded p-1">
                    
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">اسم الزبون</th>
                            <th class="text-center" scope="col">الحالة</th>
                            <th scope="col">مكتب الشحن</th>
                            <th scope="col">عدد القطع</th>
                            <th scope="col">الاجمالي</th>
                        </tr>
                    </thead>
                    <tbody>
                        <OrderItem v-for="order in orderStore.orders" :key="order.id" :order="order"/>
                    </tbody>
                </table>
                <div class="d-flex flex-row justify-content-center align-items-center">
                    <button @click="handleOrderssPages('previous')" :disabled="!orderStore.pagination.previous" class="btn btn-primary mx-1">السابق</button>
                    <button @click="handleOrderssPages('next')" :disabled="!orderStore.pagination.next" class="btn btn-primary mx-1">التالي</button>
                </div>
                
            </div>
            </div>
        </div>
    </div>
</template>