
<script setup>
import OrderItem from '@/components/order/OrderItem.vue';

const stats=[
    {name:"Orders",value:"1852",icon:"pi pi-cart-arrow-down"},
    {name:"Product",value:"1852",icon:"pi pi-box"},
    {name:"Customers",value:"1852",icon:"pi pi-users"},
    {name:"Shipped",value:"1852",icon:"pi pi-truck"}
]

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
    <main class="container p-3 ">
        <div class="row mb-3">
                    <div v-for="stat in stats" :key="stat.name" class="col-md col-sm border rounded mx-2 p-3">
                        <div class="row align-items-center">
                        <div class="col-8">
                            <div class="d-flex align-items-center">
                            <div>
                                <div class="fs-5 bsb-w-50 bsb-h-50 bg-primary-subtle text-primary rounded-2 d-flex align-items-center justify-content-center me-3">
                                <i :class="stat.icon"></i>
                                </div>
                            </div>
                            <div>
                                <h6 class="m-0">{{stat.name}}</h6>
                                <p class="text-secondary m-0 fs-7">since last week</p>
                            </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <h6 class="fs-7 d-flex align-items-center justify-content-end m-0">
                            <span class="bg-primary-subtle text-primary rounded-2 py-1 px-2">{{stat.value}}</span>
                            </h6>
                        </div>
                        </div>
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
                            <th scope="col">Status</th>
                            <th scope="col">Delivery Office</th>
                            <th scope="col">items</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <OrderItem v-for="order in orders" :key="order.id" :order="order"></OrderItem>
                    </tbody>
                </table>
            </div>
            </div>
            <!-- <div class="col-3">
                <div class="card" width="18rem">
                    <img width="100px" height="100px" :src="welcome_image" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Welcome, {{ username }}</h5>
                        <p class="card-text">How are you today?</p>
                    </div>
                </div>
            </div> -->
        </div>
      
       
      </main>
</template>