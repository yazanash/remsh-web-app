<script setup>
import logo from '@/assets/logo1.png';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import router from "@/router";
const authStore = useAuthStore(); // Access the Pinia auth store
const isAuthenticated = computed(() => !!authStore.access || !!localStorage.getItem('access'));
const userGroup = computed(() => authStore.group); // Retrieve the user's group

// Define all possible navigation items
const allNavigations = [
    {name:"الاحصائيات",to:"/",active:true,groups:  ['admin', 'supervisor']},
    {name:"المنتجات",to:"/products",active:true,groups: ['admin', 'supervisor','data_entry']},
    {name:"الطلبات",to:"/orders",active:true,groups: ['admin', 'supervisor','data_entry']},
    {name:"الفئات",to:"/categories",active:true,groups: ['admin', 'supervisor']},
    {name:"الكوبونات",to:"/coupons",active:true,groups: ['admin', 'supervisor']},
    {name:"مكاتب الشحن",to:"/delivery",active:true,groups:  ['admin', 'supervisor']},
    {name:"المعلومات الشخصية",to:"/profile",active:true,groups: ['admin', 'supervisor','data_entry']},
    {name:"ادارة التطبيق",to:"/users",active:true,groups: ['admin']},
  { name: 'تسجيل الدخول', to: '/login', active: true, groups: null }, // For unauthenticated users
  { name: 'التسجيل', to: '/signup', active: true, groups: null }, // For unauthenticated users
  { name: 'تسجيل الخروج', to: '/logout', active: true, groups: null }, // For authenticated users
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
<nav class="navbar navbar-expand-lg fixed-top navbar-dark " style="background-color: #1E293B;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img :src="logo" alt="" width="30" height="24" class="d-inline-block align-text-top">
      تطبيق رمش
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mx-auto mb-2 mb-lg-0">
        <li v-for="navigation in navigations" :key="navigation.name" class="nav-item">
          <a v-if="navigation.to==='/logout'" class="nav-link active" @click="handleLogout" href="#" >تسجيل خروج</a>
          <RouterLink v-else class="nav-link " :class="{'active':navigation.active}"  :to="navigation.to">{{navigation.name}}</RouterLink>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>
</template>

<style scoped>
body {
  background-color: #fbfbfb;
}
</style>