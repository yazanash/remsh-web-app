<script setup>
import logo from '@/assets/app_logo.png';
import { computed,ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import router from "@/router";
import { useRoute } from 'vue-router';
const authStore = useAuthStore(); // Access the Pinia auth store
const isAuthenticated = computed(() => !!authStore.access || !!localStorage.getItem('access'));
// const userGroup = computed(() => "authStore.group"); // Retrieve the user's group
const userGroup = computed(() => "admin"); // Retrieve the user's group

const isActive=(routePath)=>{
  const route = useRoute();
  return route.path===routePath
}

// Define all possible navigation items
const allNavigations = [
    {icon:'pi pi-chart-line',name:"الاحصائيات",to:"/",groups:  ['admin', 'supervisor']},
    {icon:'pi pi-box',name:"المنتجات",to:"/products",groups: ['admin', 'supervisor','data_entry']},
    {icon:'pi pi-truck',name:"الطلبات",to:"/orders",groups: ['admin', 'supervisor','data_entry']},
    {icon:'pi pi-sitemap',name:"الفئات",to:"/categories",groups: ['admin', 'supervisor']},
    {icon:'pi pi-tags',name:"الكوبونات",to:"/coupons",groups: ['admin', 'supervisor']},
    {icon:'pi pi-warehouse',name:"مكاتب الشحن",to:"/delivery",groups:  ['admin', 'supervisor']},
    {icon:'pi pi-user',name:"المعلومات الشخصية",to:"/profile",groups: ['admin', 'supervisor','data_entry']},
    {icon:'pi pi-shield',name:"ادارة التطبيق",to:"/users",groups: ['admin']},
    
];
const isSidebarVisible = ref(false);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
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
   <div >
  <!-- Menu Button -->
   <button 
    class="btn btn-primary d-lg-none menu-btn" 
    @click="toggleSidebar">
    <i class="pi pi-bars"></i>
  </button>
  
  <div 
    :class="['sidebar', { 'slide-in': isSidebarVisible }]" 
    id="sidebar"  >
    <div
      class="d-flex flex-column border-2 border-end flex-shrink-0 p-3 h-100 vh-100 sticky-top bg-light rounded-start rounded-2 "
      style="width: 270px; background-color: #fff !important"
    >
      <!-- Sidebar Header -->
      <a class="navbar-brand" href="#">
        <img :src="logo" alt="" style="background-color: #560606;" width="40" height="34" class="d-inline-block align-text-top rounded">
       <span class="align-middle mx-1">موقع رمش </span>
      </a>
      
      <hr />
      <!-- Sidebar Links -->
      <ul class="nav nav-pills flex-column mb-auto">
        <li 
          v-for="navigation in navigations" 
          :key="navigation.name" 
          class="nav-item bg-white rounded mb-2">
          <RouterLink 
            class="nav-link" style="color: #560606;"
            :class="{ 'active': isActive(navigation.to) }"  
            :to="navigation.to">
            <i :class="navigation.icon"></i> {{ navigation.name }} <i class="pi pi-arrow"></i>
          </RouterLink>
        </li>
        <li class="nav-item bg-white rounded mb-2">
          <a @click="handleLogout" href="#" class="nav-link" style="color: #560606;">
            <i class="pi pi-sign-out"></i> تسجيل خروج 
          </a>
        </li>
      </ul>
      <hr />

      <!-- Logout Option -->
      <div class="dropdown">
        <a
          class="d-flex align-items-center text-white text-decoration-none"
          @click="handleLogout">
          <i class="pi pi-home"></i> <strong> Logout</strong>
        </a>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: -300px; /* Hide sidebar off-screen */
  height: 100%;
  width: 270px;
  transition: all 0.3s ease-in-out;
  z-index: 1050; /* Ensure it's above other elements */
}

.sidebar.slide-in {
  right: 0; /* Slide the sidebar into view */
}

@media (min-width: 992px) {
  .sidebar {
    position: sticky; /* Default position on larger screens */
    right: auto;
  }
}
.menu-btn {
  position: fixed;
  top: 10px;
  left: 50px;
  z-index: 1050; /* Ensure it stays above other elements */
}
.active{
  background-color: #560606 !important;
  color: #ffffff !important;
}
.nav-link:hover{
  background: #b6aaaa;
}
</style>