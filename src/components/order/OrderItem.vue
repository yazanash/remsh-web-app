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
        <tr >
            <th scope="row">{{order.id}}</th>
            <td>{{order.user.name}}</td>
            <td class="text-center"> 
                <span class="badge" :class="getBadgeClass(order.status)">
                    {{ getStatusName(order.status) }}
                </span>
            </td>
            <td>{{order.delivery_office}}</td>
            <td>{{order.order_items_count}}</td>
            <td>{{order.total}}</td>
            <td>
              <RouterLink class="btn btn-info mx-1"  :to="`/orders/${order.id}`"><i class="pi pi-eye"></i></RouterLink>
            </td>
        </tr>
</template>