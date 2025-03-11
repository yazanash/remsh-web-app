<script setup>
import { defineProps, ref, computed } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
// {id:1,name:"Product name 1",img:img1,  offer:0,price:1500,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo est, dictum et vehicula a, fermentum posuere sem. Duis sed eleifend leo. Nullam ac enim ut arcu aliquam viverra nec eget elit. Praesent interdum turpis sapien, id aliquam justo commodo sed. Praesent convallis, risus sit amet fringilla dapibus, lorem purus pulvinar nisl, eu gravida erat nulla id orci. Mauris aliquam elit massa. Curabitur lobortis lectus sit amet libero porta tristique. Pellentesque nisi ligula, pulvinar nec tincidunt at, mollis non nibh. Nulla fermentum, lorem eget facilisis hendrerit, nisi libero bibendum nunc, a gravida elit massa non lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam euismod, enim id auctor accumsan, nulla tortor laoreet purus, sit amet semper ipsum sem a mauris. Aenean gravida lacinia malesuada. Phasellus eget iaculis elit, vitae mollis orci. Sed placerat massa sit amet eros pulvinar, ac eleifend odio tincidunt."},
import { useProductStore } from '@/stores/product';
import { onMounted } from 'vue';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts(); // Fetch products when the component is mounted
});
</script>
<template>
<div class="container p-3">
    <div class="d-flex flex-row justify-content-between">
        <h3>Products</h3>
        <RouterLink :to="`/products/create`" class='btn btn-primary'>Add Product</RouterLink>
    </div>
    
<hr/>
<div v-if="productStore.loading">Loading...</div>
<div v-if="productStore.error">{{ productStore.error }}</div>
    <div  v-if="!productStore.loading && !productStore.error" class="row g-3 my-1">
        <div class="col-4 ">
                <div class="input-group">
                    <div class="input-group-text"><i class="pi pi-filter"></i></div>
                    <select class="form-select" aria-label="Default select example">
                        <option selected> Category</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
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
        <div class="border table-responsive rounded p-1">
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">image</th>
                            <th scope="col">name </th>
                            <th scope="col">Description</th>
                            <th scope="col">Price </th>
                            <th scope="col">Offer </th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProductCard v-for="product in productStore.products" :key="product.id" :product="product"/>
                    </tbody>
                </table>
            </div>
        
</div>
</template>