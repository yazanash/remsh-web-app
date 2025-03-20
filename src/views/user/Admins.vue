<script setup>
import UserCard from '@/components/UserCard.vue';
import { reactive} from 'vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import * as bootstrap from "bootstrap";
const userStore = useUserStore();
const form = reactive({
    email:'',
    group:""
});
const error = reactive({
  message: '',
});
const isEditing = reactive({ value: false });
const openModal = () => {
    form.email = "";
    form.group = "";
  const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
  modal.show();
};

const handleSubmit =async () => {
  try{
    await userStore.AddToGroup(form)
    const modal = bootstrap.Modal.getInstance(document.getElementById("categoryModal"));
    modal.hide();
  }catch(err){
    error.message = err.message
  }
};
onMounted(async () => {
  await userStore.fetchAdminUsers(); // Fetch products when the component is mounted
});
</script>

<template>
<div class="container p-3">
<div class="d-flex flex-row justify-content-between">
        <h3>المستخدمين</h3>
        <a @click="openModal('add')" class='btn btn-primary'>أضافة مستخدم</a>
    </div>
    
<hr/>
<div class="modal fade " id="categoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"> اضافة مستخدم</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label for="productName" class="form-label">البريد الالكتروني</label>
                    <input type="text" v-model="form.email" class="form-control" id="productName" placeholder="ادخل البريد الالكتروني" required>
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
                 حفظ
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