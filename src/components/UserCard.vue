<script setup>
import { defineProps, ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const props = defineProps({
  user: Object,
});
const deleteloading = ref(false)
const handleremove=async (user_id)=>{
  try{
  deleteloading.value=true;
    
  await userStore.removeFromGroup(user_id)

  }catch(err){
    console.log(err.message)
  }
  finally{
    deleteloading.value=false
  }
}
</script>
<template>
        <tr>
            <td>{{user.email}}</td>
            <td>{{user.name}}</td>
            <td>{{user.group}}</td>
            <td>
              <button :disabled="deleteloading" @click="handleremove(user.id)" class="btn btn-danger mx-1">
              <span v-if="deleteloading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <i v-else class="pi pi-trash"></i></button>
            
            </td>
        </tr>
</template>