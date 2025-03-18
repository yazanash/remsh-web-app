<script setup>
import { ref,reactive } from 'vue';
import * as bootstrap from "bootstrap";
import { onMounted } from 'vue';
import { useDeliveryStore } from '@/stores/delivery';
const deliveryStore = useDeliveryStore();
const form = reactive({
    id:'',
    name: '',
    address: '',
});

const isEditing = reactive({ value: false });
const openModal = (mode, delivery = null) => {
  isEditing.value = mode === "edit";
  if (isEditing.value && delivery) {
    form.id = delivery.id;
    form.name = delivery.name;
    form.address = delivery.address;
  } else {
    form.id='';
    form.name = "";
    form.address = "";
  }
  const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
  modal.show();
};

const handleSubmit = async() => {
  if (isEditing.value && form.id) {
    await deliveryStore.editDelivery(form.id,form);
  }
  else{
    await deliveryStore.addDelivery(form)
  }
    form.id='';
    form.name = "";
    form.address = "";
  const modal = bootstrap.Modal.getInstance(document.getElementById("categoryModal"));
  modal.hide();
};
onMounted(async () => {
  await deliveryStore.fetchDelivery(); 
});
</script>
<template>
<div class="container p-3">
    <div class="d-flex flex-row justify-content-between">
        <h3>مكاتب الشحن</h3>
        <a @click="openModal('add')" class='btn btn-primary'>اضافة مكتب</a>
    </div>
    
<hr/>
   <!-- Modal -->
   <div class="modal fade " id="categoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing.value ? 'تعديل مكتب' : 'اضافة مكتب' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="name" class="form-label">اسم المكتب</label>
                <input type="text" class="form-control" id="name" v-model="form.name" required>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">العنوان</label>
                <input type="text" class="form-control" id="address" v-model="form.address" required>
              </div>
              <button type="submit" class="btn btn-primary">
                <span v-if="deliveryStore.loadingoperation" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ isEditing.value ? 'تعديل' : 'حفظ' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="deliveryStore.loading">
      <div class="d-flex justify-content-center align-items-center">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-if="deliveryStore.error">{{ deliveryStore.error }}</div>
        <div v-if="!deliveryStore.loading && !deliveryStore.error" class="border table-responsive rounded p-1">
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">مكتب الشحن </th>
                            <th scope="col">العنوان </th>
                            <th scope="col">خيارات </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in deliveryStore.deliveries" :key="item.id">
                            <th scope="row">{{item.id}}</th>
                            <td>{{item.name}}</td>
                            <td>{{item.address}}</td>
                            <td>
                            <a class="btn btn-primary"   @click="openModal('edit', item)"><i class="pi pi-pencil"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
</div>
</template>