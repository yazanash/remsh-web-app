<script setup>
import { ref,reactive } from 'vue';
import * as bootstrap from "bootstrap";
const items=[
    {id:1,code:"code10",percent:10,expire:'11-01-2025',count:10},
    {id:2,code:"code20",percent:20,expire:'11-02-2025',count:20},
    {id:3,code:"code30",percent:30,expire:'11-03-2025',count:30},
    {id:4,code:"code40",percent:40,expire:'11-04-2025',count:40},
    {id:5,code:"code50",percent:50,expire:'11-05-2025',count:50},
    {id:6,code:"code60",percent:60,expire:'11-06-2025',count:60},
    {id:7,code:"code70",percent:70,expire:'11-07-2025',count:70},

]

const form = reactive({
    code:'',
    percent:0,
    expire:'',
    count:0
});

const isEditing = reactive({ value: false });
const openModal = (mode, coupon = null) => {
  isEditing.value = mode === "edit";
  if (isEditing.value && coupon) {
    form.code = coupon.code;
    form.percent = coupon.percent;
    form.expire = coupon.expire;
    form.count = coupon.count;
  } else {
    form.code = "";
    form.percent = "";
    form.expire = '';
    form.count = '';
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
        <h3>Coupons</h3>
        <a @click="openModal('add')" class='btn btn-primary'>Add Coupon</a>
    </div>
    
<hr/>
<div class="modal fade " id="categoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing.value ? 'Edit Delivery' : 'Add Delivery' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
                <div class="col-md-6 mb-3">
                    <label for="productName" class="form-label">Code</label>
                    <input type="text" v-model="form.code" class="form-control" id="productName" placeholder="Enter coupon code" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="productName" class="form-label">Percent</label>
                    <input type="text" v-model="form.percent" class="form-control" id="productName" placeholder="Enter coupon percent %" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="productName" class="form-label">ExpireDate</label>
                    <input type="date" v-model="form.expire" class="form-control" id="productName" placeholder="Enter coupon expire date" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="productName" class="form-label">Count</label>
                    <input type="number" v-model="form.count" class="form-control" id="productName" placeholder="leave it blank if the coupon unlimited" required>
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
                            <th scope="col">Code</th>
                            <th scope="col">Percent</th>
                            <th scope="col">ExpireDate</th>
                            <th scope="col">Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <th scope="row">{{item.id}}</th>
                            <td>{{item.code}}</td>
                            <td>{{item.percent}}</td>
                            <td>{{item.expire}}</td>
                            <td>{{item.count}}</td>
                            <td>
                                <a class="btn btn-primary"   @click="openModal('edit', item)"><i class="pi pi-pencil"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
</div>
</template>