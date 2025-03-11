<script setup>
import OrderItem from '@/components/order/OrderItem.vue';
const orders=[
    {id:1,customer:"john doe",status:"PR",delivery:"damascus, bagdad street alkadmous",items:5,total:3000},
    {id:2,customer:"JEAN doe",status:"P",delivery:"SWAIDA, teshreen street alkadmous",items:5,total:3000},
    {id:3,customer:"ALMA doe",status:"D",delivery:"damascus, bagdad street alkadmous",items:5,total:3000},
    {id:4,customer:"RAMI doe",status:"S",delivery:"damascus, bagdad street alkadmous",items:5,total:3000},
    {id:5,customer:"AHMAD doe",status:"C",delivery:"damascus, bagdad street alkadmous",items:5,total:3000},
    {id:6,customer:"YOUSEF doe",status:"C",delivery:"damascus, bagdad street alkadmous",items:5,total:3000},
    {id:7,customer:"MOHAMMED doe",status:"S",delivery:"damascus, bagdad street alkadmous",items:5,total:3000},
    {id:8,customer:"MONEER doe",status:"S",delivery:"damascus, bagdad street alkadmous",items:5,total:3000},
    {id:9,customer:"SAMER doe",status:"S",delivery:"damascus, bagdad street alkadmous",items:5,total:3000},
]

</script>

<template>
<div class="container p-3">
<div class="d-flex flex-row justify-content-between">
        <h3>Orders</h3>
    </div>
    
<hr/>
    <div class="row g-3 my-1">
        <div class="col-4 ">
                <div class="input-group">
                    <div class="input-group-text"><i class="pi pi-filter"></i></div>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Status</option>
                        <option value="1">Processing</option>
                        <option value="2">Pending</option>
                        <option value="3">Deleverd</option>
                        <option value="3">Shipped</option>
                    </select>
                </div>
              
        </div>
        <div class="col-8">
            <form class="d-flex">
                <div class="input-group mb-3">
                    <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-primary"  type="submit"><i class="pi pi-search"></i></button>
                </div>
            </form>
        </div>
    </div>
<div class="row">
            <div class="col-md-12 col-sm-12">
                <div class="border table-responsive rounded p-1">
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer</th>
                            <th class="text-center" scope="col">Status</th>
                            <th scope="col">Delivery Office</th>
                            <th scope="col">items</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <OrderItem v-for="order in orders" :key="order.id" :order="order"/>
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
</template>