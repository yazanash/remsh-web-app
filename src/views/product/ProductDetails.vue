
<script setup>

import {ref,reactive,onMounted} from 'vue';

import productItem from '@/components/product/productItem.vue'
import { useRoute } from 'vue-router';

import { useProductDataStore } from '@/stores/product_data';

import ProductInfo from '@/components/product/ProductInfo.vue';
import ProductImages from '@/components/product/ProductImages.vue';
const router = useRoute();
const productId = router.params.id;
const productDataStore = useProductDataStore();


const item_form = reactive({
    size:'',
    color:'',
});




const handleAddItem = async () => {
  try {
    await productDataStore.addItem(productId,item_form);
    item_form.size = '';
  } catch (err) {
    console.error('Error adding product:', err);
  }
};



onMounted(async() => { 
    console.log("mounted")
  await productDataStore.fetchProductById(productId); // Fetch product info
});
</script>

<template>
    <div v-if="productDataStore.loading">Loading...</div>
<div v-if="productDataStore.error">{{ productDataStore.error }}</div>
    <main v-if="!productDataStore.loading && !productDataStore.error" class="container p-3 ">
        <ProductInfo :info="productDataStore.product?.info"/>
        <ProductImages :id="productDataStore.product?.info.id" :images="productDataStore.product?.images"/>
    
        <div class="row">
            <div class="d-flex flex-row justify-content-between">
                <h3>Colors & Sizes</h3>
            </div>
            <form @submit.prevent="handleAddItem" class="row g-3 mb-3">
                <div class="col-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Color</span>
                        <input type="color" v-model="item_form.color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color">

                    </div>
                </div>
                <div class="col-7">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-default">Size</span>
                        <input type="text" v-model="item_form.size" class="form-control" id="size" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                </div>
                <div class="col">
                    <button :disabled="productDataStore.itemloading" type="submit" class="btn btn-primary">
                        <span v-if="productDataStore.itemloading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Add
                    </button>
                </div>
            </form>
                <div class="col-md-12 col-sm-12">
                <div class="border table-responsive rounded p-1">
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Size</th>
                            <th scope="col">Color</th>
                            <th scope="col">Active</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <productItem v-for="item in productDataStore.product?.items" :key="item.id" :id="item?.id" :item="item"></productItem>
                    </tbody>
                </table>
            </div>
            </div>
            
        </div>
      </main>
</template>
