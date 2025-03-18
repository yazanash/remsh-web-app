<script setup>
import UserCard from '@/components/UserCard.vue';
import { reactive, ref, computed } from 'vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchAdminUsers(); // Fetch products when the component is mounted
});
</script>

<template>
<div class="container p-3">
<div class="d-flex flex-row justify-content-between">
        <h3>المستخدمين</h3>
    </div>
    
<hr/>
   
    <div v-if="userStore.loading">
        <div class="d-flex justify-content-center align-items-center">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-if="userStore.error">{{ userStore.error }}</div>
<div v-if="!userStore.loading && !userStore.error"  class="row">
            <div class="col-md-12 col-sm-12">
                <div class="border table-responsive rounded p-1">
                    
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">البريد الالكتروني</th>
                            <th scope="col">الاسم</th>
                            <th scope="col">المجموعة</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserCard v-for="user in userStore.users" :key="user.id" :user="user"/>
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
</template>