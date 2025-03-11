
<script setup>
import OrderProductItem from '@/components/order/OrderProductItem.vue'
import img1 from '@/assets/images/img1.jfif'
import img2 from '@/assets/images/img2.jfif'
import img3 from '@/assets/images/img3.jfif'
import img4 from '@/assets/images/img4.jfif'
import img5 from '@/assets/images/img5.jfif'
const getStatusName=(status)=>{
    const statusMap = {
        P: "Pending",
        PR: "Processing",
        S: "Shipped",
        C: "Canceled",
        D: "Delivered"
      };
      return statusMap[status] || "Unknown";
}
const getBadgeClass=(status) => {
      const badgeClasses = {
        P: "bg-secondary text-white w-70", // Yellow for Pending
        PR: "bg-warning text-dark w-70", // Blue for Processing
        S: "bg-primary text-white w-70", // Dark Blue for Shipped
        C: "bg-danger text-white w-70", // Red for Canceled
        D: "bg-success text-white w-70" // Green for Delivered
      };
      return badgeClasses[status] || "bg-secondary text-white"; // Default (Unknown)
    }
const order={
    customer:{
        name : "Yazan ash",
        phone : "+963994916917"
    },
    delivery:"damascus, bagdad street alkadmous",
    coupon:null,
    total:12500000,
    status:'PR',
    items:[
    {id:1,name:"Product name 1",img:img1,size:"S",color:'#ffc107',offer:0,price:150,count:1,total:15665},
    {id:2,name:"Product name 2",img:img2,size:"S",color:'#556556',offer:0,price:1500,count:2,total:15665},
    {id:3,name:"Product name 3",img:img3,size:"S",color:'#556556',offer:0,price:15000,count:3,total:15665},
    {id:4,name:"Product name 4",img:img4,size:"S",color:'#556556',offer:0,price:150000,count:4,total:15665},
    {id:5,name:"Product name 5",img:img5,size:"S",color:'#556556',offer:0,price:150000,count:5,total:15665},
    ],
}



</script>

<template>
    <main class="container p-3 ">
        <div class="row mb-3">
            <div class="col-md-12 card mb-3">
                <div class="row g-0">
                    <div class="col-md-12">
                    <div class="card-body">
                      
                        
                        <div class="row mt-3">
                            <div class="col-md ">
                                <h5 class="card-title"><i class="pi pi-user"></i> {{order.customer.name}}</h5>
                                <p class="card-text"><i class="pi pi-phone"></i> {{order.customer.phone}}</p>
                            </div>
                        
                            <div class="col-md">
                                <p class="card-text"><i class="pi pi-truck"></i>  <span class="badge" :class="getBadgeClass(order.status)">
                                    {{ getStatusName(order.status) }}
                                </span></p>
                                <p><i class="pi pi-box"></i> {{order.delivery}}</p>
                            </div>
                            <div class="col-md">
                                <p class="card-text"><i class="pi pi-tag"></i> {{order.coupon || "no coupon"}}</p>
                                <h4><i class="pi pi-dollar"></i> {{order.total}}</h4>
                            </div>
                        </div>
                    </div>
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
                            <th scope="col">image</th>
                            <th scope="col">name </th>
                            <th scope="col">Size</th>
                            <th scope="col">Color</th>
                            <th scope="col">Price </th>
                            <th scope="col">Offer </th>
                            <th scope="col">Count</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <OrderProductItem v-for="item in order.items" :key="item.id" :item="item"></OrderProductItem>
                    </tbody>
                </table>
            </div>
            </div>
            
        </div>
      
       
      </main>
</template>