<script setup>
import { defineProps, ref, computed } from 'vue';
const props = defineProps({
  order: Object,
});
const getStatusName=(status)=>{
    const statusMap = {
        P: "قيد الانتظار",
        PR: "قيد التجهيز",
        S: "تم الشحن",
        C: "تم الالغاء",
        D: "تم التسليم"
      };
      return statusMap[status] || "غير محدد";
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
</script>
<template>
    <div class="card" >
  <div class="card-body row">
    <div class="col-md-5">
        <h5 class="card-title">{{order.user.name}} <span class="badge" :class="getBadgeClass(order.status)">
                    {{ getStatusName(order.status) }}
        </span></h5>
        <h5 class="card-subtitle mb-2 text-success">
            <i class="pi pi-dollar"></i> {{order.total}}
            </h5>
    </div>
    <div class="col-md-5">
        <p class="card-text"><i class="pi pi-map-marker"></i> {{order.delivery_office}}</p>
    <p class="card-text"> <i class="pi pi-cart-arrow-down"></i> {{order.order_items_count}}</p>
    </div>
    <div class="col-md-2">
        <RouterLink class="btn btn-info mx-1"  :to="`/orders/${order.id}`">عرض الطلب</RouterLink>

    </div>
  </div>
</div>
</template>