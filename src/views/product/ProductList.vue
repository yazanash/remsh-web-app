<script setup>
import { reactive, ref, computed } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import ProductCard2 from '@/components/product/ProductCard2.vue';
// {id:1,name:"Product name 1",img:img1,  offer:0,price:1500,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo est, dictum et vehicula a, fermentum posuere sem. Duis sed eleifend leo. Nullam ac enim ut arcu aliquam viverra nec eget elit. Praesent interdum turpis sapien, id aliquam justo commodo sed. Praesent convallis, risus sit amet fringilla dapibus, lorem purus pulvinar nisl, eu gravida erat nulla id orci. Mauris aliquam elit massa. Curabitur lobortis lectus sit amet libero porta tristique. Pellentesque nisi ligula, pulvinar nec tincidunt at, mollis non nibh. Nulla fermentum, lorem eget facilisis hendrerit, nisi libero bibendum nunc, a gravida elit massa non lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam euismod, enim id auctor accumsan, nulla tortor laoreet purus, sit amet semper ipsum sem a mauris. Aenean gravida lacinia malesuada. Phasellus eget iaculis elit, vitae mollis orci. Sed placerat massa sit amet eros pulvinar, ac eleifend odio tincidunt."},
import { useProductStore } from '@/stores/product';
import { onMounted } from 'vue';

const productStore = useProductStore();
const form = reactive({
  search: null,
  category:null,
});
const handleProductsFilter =async()=>{
    await productStore.fetchProducts(form);
}
const handleProductsPages =async(operation =null)=>{
    await productStore.fetchProducts(form,operation);
}
const handleClear = async() => {
      form.search=null;
      form.category=null
        await productStore.fetchProducts(form);
    };
onMounted(async () => {
  await productStore.fetchProducts(); // Fetch products when the component is mounted
  await productStore.fetchCategories(); // Fetch products when the component is mounted
});
</script>
<template>
   
<div   class="container p-3 rounded bg-white">
    <div class="d-flex flex-row justify-content-between">
        <h3>المنتجات</h3>
        <RouterLink :to="`/products/create`" class='btn btn-primary'>اضافة منتج</RouterLink>
    </div>
    
<hr/>

    <form @submit.prevent="handleProductsFilter" class="row g-3 my-1">
        <div class="col-4 ">
                <div class="input-group">
                    <div class="input-group-text"><i class="pi pi-filter"></i></div>
                    <select  v-model="form.category" class="form-select" aria-label="Default select example">
                        <option :selected="true" :value="null">
                            الكل
                        </option>
                        <option v-for="category in productStore.categories" :key="category.id" :value="category.name">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
              
        </div>
        <div class="col-6">
            <div class="d-flex">
                <div class="input-group mb-3">
                    <input  v-model="form.search" class="form-control" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-primary"  type="submit"><i class="pi pi-search"></i></button>
                </div>
            </div>
        </div>
        <div class="col-2">
            <div class="d-flex">
                <div class="input-group mb-3">
                     <a class="btn btn-primary" @click="handleClear" :class="{'disabled':!form.category&&!form.search}" type="submit">Clear</a>
                </div>
            </div>
        </div>
    </form>
    <div v-if="productStore.loading">
        <div class="d-flex justify-content-center align-items-center">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-if="productStore.error">{{ productStore.error }}</div>
        <div v-if="!productStore.loading && !productStore.error" class=" row rounded p-1">
               
                    
                <ProductCard2 v-for="product in productStore.products" :key="product.id" :product="product"/>
                    
                <div class="d-flex flex-row justify-content-center align-items-center">
                    <button @click="handleProductsPages('previous')" :disabled="!productStore.pagination.previous" class="btn btn-primary mx-1">السابق</button>
                    <button @click="handleProductsPages('next')" :disabled="!productStore.pagination.next" class="btn btn-primary mx-1">التالي</button>
                </div>
                
            </div>
        
</div>
</template>