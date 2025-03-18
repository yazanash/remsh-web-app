<script setup>
import { ref,reactive } from 'vue';
import * as bootstrap from "bootstrap";
import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';

const categoryStore = useCategoryStore();
const form = reactive({
    name:'',
    id:null
});

const isEditing = reactive({ value: false });
const openModal = (mode, category = null) => {
  isEditing.value = mode === "edit";
  if (isEditing.value && category) {
    form.name = category.name;
    form.id = category.id;
  } else {
    form.name = "";
    form.id = null;
  }
  const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
  modal.show();
};

const handleSubmit =async () => {
  if (isEditing.value && form.id) {
    await categoryStore.editCategory(form.id,form);
  }
  else{
    await categoryStore.addCategory(form)
  }
  const modal = bootstrap.Modal.getInstance(document.getElementById("categoryModal"));
  modal.hide();
};
onMounted(async () => {
  await categoryStore.fetchCategories(); // Fetch products when the component is mounted
});
</script>
<template>
<div class="container p-3">
    <div class="d-flex flex-row justify-content-between">
        <h3>الفئات</h3>
        <a @click="openModal('add')" class='btn btn-primary'>أضافة فئة</a>
    </div>
    
<hr/>
<div class="modal fade " id="categoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing.value ? 'تعديل فئة' : 'اضافة فئة' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
                <div class="col-md-6 mb-3">
                    <label for="productName" class="form-label">الفئة</label>
                    <input type="text" v-model="form.name" class="form-control" id="productName" placeholder="Enter category name" required>
                </div>
              <button :disabled="categoryStore.loadingoperation" type="submit" class="btn btn-primary">
                <span v-if="categoryStore.loadingoperation" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ isEditing.value ? 'تعديل' : 'حفظ' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="categoryStore.loading" >
      <div class="d-flex justify-content-center align-items-center">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-if="categoryStore.error">{{ categoryStore.error }}</div>
        <div v-if="!categoryStore.loading && !categoryStore.error" class="border table-responsive rounded p-1">
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">الاسم </th>
                            <th scope="col">خيارات </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in categoryStore.categories" :key="item.id">
                            <th scope="row">{{item.id}}</th>
                            <td>{{item.name}}</td>
                            <td>
                                <a class="btn btn-primary"   @click="openModal('edit', item)"><i class="pi pi-pencil"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
</div>
</template>