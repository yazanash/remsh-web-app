<script setup>
import * as bootstrap from "bootstrap";
import {ref,reactive,onMounted} from 'vue';
import imgPlaceholder from '@/assets/images/img-placeholder.jpeg'
import { useProductStore } from '@/stores/product';
const productStore = useProductStore();
const props = defineProps({
    images: Object,
    id:Object
});

const productId = props.id
const imagePreview = ref(null);
const fileInput = ref(null);
const form = reactive({
    id:'',
    image:'',
});
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
    form.image = file; 
    }
};
const isEditing = reactive({ value: false });
const openModal = (mode, image = null) => {
    console.log(image)
  isEditing.value = mode === "edit";
  if (isEditing.value && image) {
    form.image = image.image_url;
    form.id=image.id;
    imagePreview.value = form.image
  } else {
    form.image = null;
    form.id=null;
    imagePreview.value=null
  }
  const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
  modal.show();
};
const handleAddImage = async () => {
  try {
        if (isEditing.value) {
            await productStore.editImage(productId,form);
        } else {
            await productStore.addImage(productId,form);
        }
    
    form.image = null;
    imagePreview.value = form.image;
    const modalElement = document.getElementById('categoryModal');
    const modal = bootstrap.Modal.getInstance(modalElement); // Get the modal instance
    if (modal) {
      modal.hide(); // Hide the modal
  }
   
  } catch (err) {
    console.error('Error adding product:', err);
  }
};
const handleDeleteImage = async () => {
  try {
    await productStore.deleteImage(form.id);
    form.image = null;
    form.id = null;
    imagePreview.value = form.image;
    const modalElement = document.getElementById('categoryModal');
    const modal = bootstrap.Modal.getInstance(modalElement); // Get the modal instance
    if (modal) {
      modal.hide(); // Hide the modal
  }
   
  } catch (err) {
    console.error('Error adding product:', err);
  }
};
</script>

<template>
    <section class="mb-3">
        <div class="d-flex flex-row justify-content-between">
            <h4>Product images</h4> 
            <a @click="openModal('add')" class='btn btn-primary'>Add Image</a>
        </div>
        <div class="modal fade " id="categoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing.value ? 'Edit Image' : 'Add Image' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleAddImage">
                <div class="d-flex flex-column justify-content-start align-items-center">
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
                alt="Click to upload" style="width: 300px; height: 300px;"
               
                />
                <div class="d-flex flex-row  justify-content-around">
                    <a  @click="triggerFileInput" class="btn btn-primary mx-2" >select image</a>
               
                    <button type="submit" class="btn btn-primary">
                        {{ isEditing.value ? 'Update' : 'Save' }}
                    </button>
                    <a  v-if="isEditing.value" @click="handleDeleteImage" class="btn btn-danger mx-2" ><i class="pi pi-trash"></i></a>
                </div>
               
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
            <div class="d-flex flex-wrap">
            <!-- Image 1 -->
            <div v-for="item in images" :key="item.id" @click="openModal('edit',item)" class="p-2">
                <img :src="item.image_url" class="img-fluid rounded border-1" alt="Image 1" style="height: 100px;;width:100px">
            </div>
           
            <!-- Add more images as needed -->
            </div>
            <hr>
        </section>
</template>