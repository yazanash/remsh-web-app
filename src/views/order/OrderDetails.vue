
<script setup>
import OrderProductItem from '@/components/order/OrderProductItem.vue'

import {ref,reactive,onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { useOrderStore } from '@/stores/order';

const router = useRoute();
const orderId = router.params.id;
const orderStore = useOrderStore();


const form = reactive({
    status:null,
    message:null
});

const getStatusName=(status)=>{
    const statusMap = {
        P: "قيد الانتظار",
        PR: "قيد التجهيز",
        S: "تم الشحن",
        C: "تم الالغاء",
        D: "تم التوصيل"
      };
      return statusMap[status] || "غير معروف";
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
  form.message=orderStore.order?.message
});


</script>

<template>
    <div v-if="orderStore.loading">
      <div class="d-flex justify-content-center align-items-center  bg-white">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-if="orderStore.error">{{ orderStore.error }}</div>
        <main v-if="!orderStore.loading && !orderStore.error" class="container p-3 rounded bg-white">
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
                        <span class="input-group-text" id="inputGroup-sizing-default">الحالة</span>
                        <select v-model="form.status" class="form-select" aria-label="Default select example">
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
                            <input class="form-control" v-model="form.message" type="search" placeholder="Search" aria-label="Search">
                        </div>
                    </div>
                </div>
                <div class="col">
                    <button :disabled="orderStore.changestatusloading||!form.status" type="submit" class="btn btn-primary">
                        <span v-if="orderStore.changestatusloading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                         تغيير الحالة
                    </button>
                </div>
            </form>
            <div class="col-md-12 col-sm-12">
                <div class="border table-responsive rounded p-1">
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">الصورة</th>
                            <th scope="col">اسم المنتج </th>
                            <th scope="col">القياس</th>
                            <th scope="col">اللون</th>
                            <th scope="col">السعر </th>
                            <th scope="col">السعر المخفض </th>
                            <th scope="col">الكمية</th>
                            <th scope="col">الاجمالي</th>
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