<script setup>
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
    info: Object,
});

</script>

<template>
  <div class="row mb-3">
            <div class="col-3">
                <div class="card " >
                    <img :src="info?.thumbnail" class="card-img-top" alt="...">
                    
                </div>
            </div>
       <div class="col">

      
        <section class="mb-3">
            <h4>{{ info?.name }}</h4>
            <p class="card-text"><strong > {{ info?.category }}</strong> </p>
            <p class="card-text">{{ info?.description }} </p>
            <h5 class="card-title"><i class="pi pi-dollar"></i> {{info?.price}}</h5>
                       
                       <p class="card-text"><strong><i class="pi pi-tag"></i> {{ info?.offer }}</strong></p>

                       <p class="card-text"><strong><i class="pi pi-thumbs-up-fill"></i> {{ info?.likes_count }}</strong></p>
            <RouterLink :to="`/products/edit/${info?.id}`" class="btn btn-secondary">
                تعديل
            </RouterLink>
            <RouterLink class="btn btn-danger mx-1"  :to="`/products/delete`"><i class="pi pi-trash"></i></RouterLink>
        </section>
      
       
    </div>

    </div>
    <hr>
</template>