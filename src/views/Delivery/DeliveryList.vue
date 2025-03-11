<script setup>
import { ref,reactive } from 'vue';
import * as bootstrap from "bootstrap";
const items=[
    {id:1,name:"Delivery 1",address:"swaida syria souk swaida"},
    {id:2,name:"Delivery 2",address:"swaida syria souk swaida"},
    {id:3,name:"Delivery 3",address:"swaida syria souk swaida"},
    {id:4,name:"Delivery 4",address:"swaida syria souk swaida"},
    {id:5,name:"Delivery 5",address:"swaida syria souk swaida"},
    {id:6,name:"Delivery 6",address:"swaida syria souk swaida"},
    {id:7,name:"Delivery 7",address:"swaida syria souk swaida"},

]

const form = reactive({
    name: '',
    address: '',
});

const isEditing = reactive({ value: false });
const openModal = (mode, delivery = null) => {
  isEditing.value = mode === "edit";
  if (isEditing.value && delivery) {
    form.name = delivery.name;
    form.address = delivery.address;
  } else {
    form.name = "";
    form.address = "";
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
        <h3>Delivery</h3>
        <a @click="openModal('add')" class='btn btn-primary'>Add Delivery</a>
    </div>
    
<hr/>
   <!-- Modal -->
   <div class="modal fade " id="categoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing.value ? 'Edit Delivery' : 'Add Delivery' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="name" class="form-label">Delivery Name</label>
                <input type="text" class="form-control" id="name" v-model="form.name" required>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input type="text" class="form-control" id="address" v-model="form.address" required>
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
                            <th scope="col">Address </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
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