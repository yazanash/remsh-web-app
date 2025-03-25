<script setup>
import UserCard from '@/components/UserCard.vue';
import { reactive,ref} from 'vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import * as bootstrap from "bootstrap";
const userStore = useUserStore();
const form = reactive({
    email:'',
    group:"",
    id:''
});
const error = reactive({
  message: '',
});
const isEditing = reactive({ value: false });
const openModal = (mode, user = null) => {
  isEditing.value = mode === "edit";
  if (isEditing.value && user) {
    form.email = user.email;
    form.group = user.group;
    form.id = user.id;
  } else {
    form.email = "";
    form.group = "";
    form.id = null;
  }
  const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
  modal.show();
};

const handleSubmit =async () => {
  try{
    if (isEditing.value && form.id) {
      await userStore.changeGroup(form.id,form)

      }
      else{
        await userStore.AddToGroup(form)

      }
    const modal = bootstrap.Modal.getInstance(document.getElementById("categoryModal"));
    modal.hide();
  }catch(err){
    error.message = err.message
  }
};

const deleteloading = ref(false)
const deleteitem=ref(0)
const handleremove=async (user_id)=>{
  try{
    deleteitem.value=user_id
  deleteloading.value=true;
    
  await userStore.removeFromGroup(user_id)

  }catch(err){
    console.log(err.message)
  }
  finally{
    deleteitem.value=0
    deleteloading.value=false
  }
}
onMounted(async () => {
  await userStore.fetchAdminUsers(); // Fetch products when the component is mounted
});
</script>

<template>
<div class="container p-3 bg-white rounded">
<div class="d-flex flex-row justify-content-between">
        <h3>المستخدمين</h3>
        <a @click="openModal('add')" class='btn btn-primary'>أضافة مستخدم</a>
    </div>
    
<hr/>
<div class="modal fade " id="categoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing.value ? 'تعديل مستخدم' : 'اضافة مستخدم' }}</h5>
            <button :disabled="userStore.loadingoperation" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
                <div v-if="!isEditing.value" class="mb-3">
                    <label for="productName" class="form-label">البريد الالكتروني</label>
                    <input type="text" v-model="form.email" class="form-control" id="productName" placeholder="ادخل البريد الالكتروني" required>
                </div>
                <div v-else class="mb-3 row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">البريد الالكتروني</label>
                  <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" v-model="form.email">
                  </div>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-text"><i class="pi pi-id-card"></i></div>
                    <select  v-model="form.group" class="form-select" aria-label="Default select example">
                        <option :selected="true" value="">قم بتحديد مجموعة</option>
                        <option value="admin">admin</option>
                        <option value="supervisor">supervisor</option>
                        <option value="data_entry">data entry</option>
                    </select>
                </div>
                <div class="mb-3">
                <strong v-if="error.message" class="text-danger">{{ error.message }}</strong>

                </div>
              <button :disabled="userStore.loadingoperation" type="submit" class="btn btn-primary">
                <span v-if="userStore.loadingoperation" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ isEditing.value ? 'تعديل' : 'حفظ' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
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
                            <th scope="col">عمليات</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr v-for="user in userStore.users" :key="user.id">
                            <td>{{user.email}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.group}}</td>
                            <td>
                              <button :disabled="deleteloading" @click="openModal('edit', user)" class="btn btn-danger mx-1">
                              <i class="pi pi-pencil"></i></button>
                              <button :disabled="deleteloading&&deleteitem.value===user.id" @click="handleremove(user.id)" class="btn btn-danger mx-1">
                                <span v-if="deleteloading&&deleteitem.value===user.id" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <i v-else class="pi pi-trash"></i>
                              </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
</template>