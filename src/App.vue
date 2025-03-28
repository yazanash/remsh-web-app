<script setup>
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import { useAuthStore } from '@/stores/auth';
import Sidebar from './components/common/Sidebar.vue';
const authStore = useAuthStore();
authStore.access = localStorage.getItem('access');
authStore.refresh = localStorage.getItem('refresh');
authStore.group = localStorage.getItem('group');
if (authStore.access) {
  authStore.verifyToken().then((isValid) => {
    if (!isValid) {
      authStore.refreshAccessToken();
    }
  });
  if(!authStore.group){
    authStore.getUserGroup();
  }
  if(!authStore.profile){
    authStore.getProfile();
  }
}

</script>
<template>
  <!-- <Navbar/> -->
  <div class="container-fluid p-0 d-flex h-100">
    
      <Sidebar v-if="authStore.access"/>

      <div class="container-fluid mx-1 my-2" style="padding-top: 4rem;"> 
        <RouterView />
      </div>
  </div>
  
</template>

