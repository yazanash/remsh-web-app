<script setup>
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import { useAuthStore } from '@/stores/auth';

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
}

</script>
<template>
  <Navbar/>
  <div style="margin-top: 5rem;"> 
    <RouterView />

  </div>
</template>

