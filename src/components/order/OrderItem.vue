<script setup>
import { defineProps, ref, computed } from 'vue';
const props = defineProps({
  order: Object,
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
</script>
<template>
        <tr >
            <th scope="row">{{order.id}}</th>
            <td>{{order.customer}}</td>
            <td class="text-center"> 
                <span class="badge" :class="getBadgeClass(order.status)">
                    {{ getStatusName(order.status) }}
                </span>
            </td>
            <td>{{order.delivery}}</td>
            <td>{{order.items}}</td>
            <td>{{order.total}}</td>
            <td>
              <RouterLink class="btn btn-info"  to="/orders/view"><i class="pi pi-eye"></i></RouterLink>
            </td>
        </tr>
</template>