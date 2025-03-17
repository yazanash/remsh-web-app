<script setup>
import { ref } from "vue";
import imgPlaceholder from '@/assets/images/img-placeholder.jpeg'
import { reactive, onMounted } from 'vue';
import { useProductStore } from '@/stores/product';
import { useRoute } from 'vue-router';
import { useProductDataStore } from '@/stores/product_data';
import myrouter from "@/router";
const productDataStore = useProductDataStore();
const router = useRoute();
const productId = router.params.id;
const imagePreview = ref(null);
const fileInput = ref(null);
  
const triggerFileInput = () => {
      fileInput.value.click();
    };
    const onImageSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.value = e.target.result; // Set preview image
        };
        reader.readAsDataURL(file);
        form.thumbnail = file; // Store the selected file in the form object
      }
    };
const form = reactive({
  name: '',
  category:'',
  price: 0,
  offer:0,
  description: '',
  thumbnail: null,
});
const handleAddProduct = async () => {
  try {
   await productStore.editProduct(productId,form);
   myrouter.push('/products/'+productId);
  } catch (err) {
    console.error('Error adding product:', err);
  }
};
onMounted(async () => {
  await productStore.fetchCategories(); // Fetch categories when the component is mounted
  await productDataStore.fetchProductById(productId); // Fetch product info
  form.name= productDataStore.product?.info.name;
  const category = productStore.categories.find((item) => item.name === productDataStore.product?.info.category_name); // Find the item
//   console.log(productStore.categories)
//   console.log(productStore.product?.info)
  form.category= category.id;
  form.price=  productDataStore.product?.info.price;
  form.offer= productDataStore.product?.info.offer;
  form.description=  productDataStore.product?.info.description;
  imagePreview.value=  productDataStore.product?.info.thumbnail;
});
const productStore = useProductStore();
</script>

<template>
    <div v-if="productDataStore.loading||productStore.loading">Loading...</div>
    <div v-if="productDataStore.error||productStore.loading">{{ productDataStore.error }}</div>
    <div v-if="!productDataStore.loading && !productDataStore.error&&!productStore.loading" class="container my-3">
    <h2 class="text-center mb-4">تعديل المنتج</h2>
    <form class="row " @submit.prevent="handleAddProduct">
        <div class="col-3 d-flex flex-column justify-content-start align-items-center">
            <input
                type="file"
                ref="fileInput"
                class="d-none"
                accept="image/*"
                @change="onImageSelect"
            />
            
            <!-- Image Preview -->
           
                <img  class="img-thumbnail my-2 mx-auto"
                :src="imagePreview || imgPlaceholder"
                alt="Click to upload" style="height: 200px; width: 200px;"
               
                />
                <a  @click="triggerFileInput"  class="btn btn-primary mx-auto" >تغيير الصورة</a>
               
        </div>
        
        <div class="col">

        
      <!-- Product Name -->
      <div class="mb-3">
        <label for="productName" class="form-label">اسم المنتج</label>
        <input type="text" v-model="form.name" class="form-control" id="productName" placeholder="Enter product name" required>
      </div>
      <div class="mb-3">
        <label for="category"  class="form-label">الفئة</label>
        <select class="form-select" v-model="form.category" id="category" aria-label="Default select example">
          <option v-for="category in productStore.categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      </div>
      
      <!-- Product Price -->
      <div class="mb-3">
        <label for="productPrice" class="form-label">السعر</label>
        <input type="number" v-model="form.price" class="form-control" id="productPrice" placeholder="Enter product price" required>
      </div>
      <div class="mb-3">
        <label for="offer" class="form-label">السعر المخفظ</label>
        <input type="number" v-model="form.offer" class="form-control" id="offer" placeholder="Enter product offer" required>
      </div>
      <!-- Product Description -->
      <div class="mb-3">
        <label for="productDescription" class="form-label">الوصف</label>
        <textarea class="form-control" v-model="form.description" id="productDescription" rows="3" placeholder="Enter product description" required></textarea>
      </div>

     

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary float-end">تعديل</button>
    </div>
    </form>
  </div>
</template>
<style scoped>

</style>