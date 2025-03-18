<script setup>
const props = defineProps({
  name: String,
  value: String,
  icon: String,
  sub:String,
  ispadge:Boolean
});

const getStatusName=(status)=>{
    const statusMap = {
        P: "قيد الانتظار",
        PR: "قيد التجهيز",
        S: "تم الشحن",
        C: "تم الالغاء",
        D: "تم التسليم"
      };
      return statusMap[status] || "Unknown";
}
const getBadgeClass=(status) => {
      const badgeClasses = {
        P: "bg-secondary-subtle text-secondary w-70", // Yellow for Pending
        PR: "bg-warning-subtle text-dark w-70", // Blue for Processing
        S: "bg-primary-subtle text-primary w-70", // Dark Blue for Shipped
        C: "bg-danger-subtle text-danger w-70", // Red for Canceled
        D: "bg-success-subtle text-success w-70" // Green for Delivered
      };
      return badgeClasses[status] || "bg-secondary text-white"; // Default (Unknown)
    }

    const getBadgeIcon=(status) => {
      const badgeClasses = {
        P: "pi pi-hourglass", // Yellow for Pending
        PR: "pi pi-spinner", // Blue for Processing
        S: "pi pi-truck", // Dark Blue for Shipped
        C: "pi pi-times-circle", // Red for Canceled
        D: "pi pi-check-circle" // Green for Delivered
      };
      return badgeClasses[status] || "pi pi-box"; // Default (Unknown)
    }
</script>

<template>
      <div class="col-md col-sm border rounded my-2 p-3">
                        <div class="row align-items-center">
                        <div class="col-8">
                            <div class="d-flex align-items-center">
                            <div>
                               
                                <div v-if="props.ispadge===false" class="fs-5 bsb-w-50 bsb-h-50 bg-primary-subtle text-primary rounded-2 d-flex align-items-center justify-content-center me-3">
                                <i :class="props.icon"></i>
                                </div>
                                <div v-else :class="getBadgeClass(props.name)" class="fs-5 bsb-w-50 bsb-h-50 rounded-2 d-flex align-items-center justify-content-center me-3">
                                <i :class="getBadgeIcon(props.name)"></i>
                                </div>
                            </div>
                            <div>
                                <span v-if="props.ispadge===true" class="badge fs-6" :class="getBadgeClass(props.name)">
                                    {{ getStatusName(props.name) }}
                                </span>
                                <h6 v-else class="m-0">{{props.name}}</h6>
                                <p class="text-secondary m-0 fs-7">{{props.sub}}</p>
                            </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <h6 class="fs-7 d-flex align-items-center justify-content-end m-0">
                                    <span v-if="props.ispadge===false"  class="bg-primary-subtle text-primary rounded-2 py-1 px-2">{{props.value}}</span>
                                    <span v-else  :class="getBadgeClass(props.name)" class=" rounded-2 py-1 px-2">{{props.value}}</span>
                            
                            </h6>
                        </div>
                        </div>
                    </div>
</template>