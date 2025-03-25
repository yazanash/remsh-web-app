
<script setup>
import { reactive,ref } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import { onMounted } from 'vue';
import StatsCard from '@/components/StatsCard.vue';
const dashboardStore = useDashboardStore();
onMounted(async () => {
  await dashboardStore.fetchStats(); // Fetch products when the component is mounted
});

</script>

<template>
    <main class="container p-3  bg-white">
        <div v-if="dashboardStore.loading">
            <div class="d-flex justify-content-center align-items-center">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
        </div>
    <div v-if="dashboardStore.error">{{ dashboardStore.error }}</div>
        <div v-if="!dashboardStore.loading && !dashboardStore.error">
        <div class="row">
            <div class="col-4 ">
                <StatsCard :name="`اجمالي المبيعات`" :value="dashboardStore.stats.total_revenue?.toString()" :ispadge="false" :icon="`pi pi-dollar`" ></StatsCard>
            </div>
            <div class="col-4">
                <StatsCard :name="`عدد الطلبات`" :value="dashboardStore.stats.total_orders?.toString()" :ispadge="false" :icon="`pi pi-shopping-cart`" ></StatsCard>
            </div>
            <div class="col-4">
                <StatsCard :name="`عدد المستخدمين`" :value="dashboardStore.stats.users_count?.toString()" :ispadge="false" :icon="`pi pi-user`" ></StatsCard>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-8">
                <ul class="list-group">
                    <!-- <li  class="list-group-item"> -->
                        <StatsCard v-for="item in dashboardStore.stats?.orders_by_status" :key="item" :name="item.status" :ispadge="true" :sub="item.count?.toString()" :value="item.total_revenue?.toString()" :icon="`pi pi-user`" ></StatsCard>
                    <!-- </li> -->
                </ul>
            </div>
            <div class="col-4">
                <ul class="list-group">
                    <!-- <li class="list-group-item"> -->
                        <StatsCard :name="`عدد القطع في كل الطلبات`" :value="dashboardStore.stats.total_products?.toString()" :ispadge="false" :icon="`pi pi-box`" ></StatsCard>
                    <!-- </li> -->
                    <!-- <li class="list-group-item"> -->
                        <StatsCard :name="`طلبات استفادت من الكوبونات`" :value="dashboardStore.stats.discounted_orders?.toString()" :ispadge="false" :icon="`pi pi-tags`" ></StatsCard>
                    <!-- </li> -->
                    
                </ul>
            </div>
        </div>
    </div>
      </main>
</template>