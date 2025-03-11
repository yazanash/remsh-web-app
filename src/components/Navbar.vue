<script setup>
import logo from '@/assets/logo1.png';


const navigations =[
    {name:"Home",to:"/",active:true},
    {name:"Products",to:"/products",active:true},
    {name:"Orders",to:"/orders",active:true},
    {name:"Category",to:"/categories",active:true},
    {name:"Copouns",to:"/coupons",active:true},
    {name:"Delivery Offices",to:"/delivery",active:true},
]


</script>

<template>
<nav class="navbar navbar-expand-lg fixed-top navbar-dark " style="background-color: #1E293B;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img :src="logo" alt="" width="30" height="24" class="d-inline-block align-text-top">
      Remsh
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mx-auto mb-2 mb-lg-0">
        <li v-for="navigation in navigations" :key="navigation.name" class="nav-item">
          <RouterLink class="nav-link " :class="{'active':navigation.active}"  :to="navigation.to">{{navigation.name}}</RouterLink>
        </li>
      </ul>
      
    </div>
    <ul class="navbar-nav me-auto mx-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link " :to="`/profile`">Profile</RouterLink>
        </li>
      </ul>
  </div>
</nav>
</template>

<style scoped>
body {
  background-color: #fbfbfb;
}
</style>