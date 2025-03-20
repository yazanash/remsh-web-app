<script setup>
import logo from '@/assets/app_logo.png';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import router from "@/router";
const authStore = useAuthStore(); // Access the Pinia auth store
const isAuthenticated = computed(() => !!authStore.access || !!localStorage.getItem('access'));
// const userGroup = computed(() => "authStore.group"); // Retrieve the user's group
const userGroup = computed(() => "admin"); // Retrieve the user's group

// Define all possible navigation items
const allNavigations = [
    {icon:'pi pi-chart-line',name:"الاحصائيات",to:"/",active:true,groups:  ['admin', 'supervisor']},
    {icon:'pi pi-box',name:"المنتجات",to:"/products",active:false,groups: ['admin', 'supervisor','data_entry']},
    {icon:'pi pi-truck',name:"الطلبات",to:"/orders",active:false,groups: ['admin', 'supervisor','data_entry']},
    {icon:'pi pi-sitemap',name:"الفئات",to:"/categories",active:false,groups: ['admin', 'supervisor']},
    {icon:'pi pi-tags',name:"الكوبونات",to:"/coupons",active:false,groups: ['admin', 'supervisor']},
    {icon:'pi pi-warehouse',name:"مكاتب الشحن",to:"/delivery",active:false,groups:  ['admin', 'supervisor']},
    {icon:'pi pi-user',name:"المعلومات الشخصية",to:"/profile",active:false,groups: ['admin', 'supervisor','data_entry']},
    {icon:'pi pi-shield',name:"ادارة التطبيق",to:"/users",active:false,groups: ['admin']},
    
];

// Dynamically filter navigation items
const navigations = computed(() => {
  if (!isAuthenticated.value) {
    // Show only login and register for unauthenticated users
    return allNavigations.filter(item => item.name === 'تسجيل الدخول' || item.name === 'التسجيل');
  }
  // Show logout and routes allowed for the user's group
  return allNavigations.filter(
    item =>item.name === 'تسجيل الخروج' ||
     // Always show logout for authenticated users
      (item.groups && item.groups.includes(userGroup.value)) // Filter by allowed groups
  );
});

const handleLogout=()=>{
  authStore.logout();
  router.push('/login')
}
</script>
<template>
   <div>
  <!-- Menu Button -->
  <button
    class="menu-btn btn btn-primary d-md-none"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasExample"
    aria-controls="offcanvasExample"
  >
    Menu
  </button>

  <!-- Sidebar -->
  <div
    id="offcanvasExample"
    tabindex="-1"
    class="offcanvas-md offcanvas-start offcanvas-md d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100"
    style="width: 300px;"
  >
    <!-- Sidebar Header -->
    <a
      href="/"
      class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
    >
      <span class="fs-4">Sidebar</span>
    </a>
    <hr />

    <!-- Sidebar Links -->
    <ul class="nav nav-pills flex-column mb-auto">
      <li v-for="navigation in navigations" :key="navigation.name" class="nav-item">
        <RouterLink 
            class="nav-link " 
            :class="{'active':navigation.active}"  
            :to="navigation.to"> 
            <i class="pi pi-home"></i>   {{navigation.name}}
        </RouterLink>
      </li>
    </ul>
    <hr />

    <!-- Logout Option -->
    <div class="dropdown">
      <a
            class="d-flex align-items-center text-white text-decoration-none"
            @click="handleLogout"> 
            <i class="pi pi-home"></i>  <strong>  Logout</strong>
        </a>
    </div>
  </div>
</div>
</template>
<style scoped>
.menu-btn {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1050; /* Ensure it stays above other elements */
}

.offcanvas {
  transition: transform 0.3s ease-in-out; /* Smooth slide-in/out */
}

</style>