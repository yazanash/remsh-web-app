<script setup>
import { ref,reactive } from 'vue';
import * as bootstrap from "bootstrap";
const items=[
    {id:1,name:"Category name 1"},
    {id:2,name:"Category name 2"},
    {id:3,name:"Category name 3"},
    {id:4,name:"Category name 4"},
    {id:5,name:"Category name 5"},
    {id:6,name:"Category name 6"},
    {id:7,name:"Category name 7"},

]
const form = reactive({
    name:'',
});

const isEditing = reactive({ value: false });
const openModal = (mode, category = null) => {
  isEditing.value = mode === "edit";
  if (isEditing.value && category) {
    form.name = category.name;
  } else {
    form.name = "";
  }
  const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
  modal.show();
};

const handleSubmit = () => {
  if (isEditing.value) {
    const index = categories.findIndex(cat => cat.id === form.id);
    if (index !== -1) {
      categories[index].name = form.name;
      categories[index].description = form.description;
    }
  } else {
    categories.push({
      ...form,
      id: Date.now(), // Generate a unique ID
    });
  }
  const modal = bootstrap.Modal.getInstance(document.getElementById("categoryModal"));
  modal.hide();
};
</script>
<template>
<div class="container p-3">
    <div class="d-flex flex-row justify-content-between">
        <h3>Categories</h3>
        <a @click="openModal('add')" class='btn btn-primary'>Add Category</a>
    </div>
    
<hr/>
<div class="modal fade " id="categoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing.value ? 'Edit Category' : 'Add Category' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
                <div class="col-md-6 mb-3">
                    <label for="productName" class="form-label">Category</label>
                    <input type="text" v-model="form.name" class="form-control" id="productName" placeholder="Enter coupon code" required>
                </div>
              <button type="submit" class="btn btn-primary">
                {{ isEditing.value ? 'Update' : 'Save' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
        <div class="border table-responsive rounded p-1">
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
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