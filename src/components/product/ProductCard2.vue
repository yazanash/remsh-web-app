<script setup>
import { defineProps, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
const props = defineProps({
  product: Object,
});
const truncatedDescription = computed(() => {
  let description = props.product.description;
   description = description.substring(0, 50) + '...';
  return description;
});
</script>
<template>
    <div class="card mb-3 col-12" >
  <div class="row g-0">
    <div class="col-md-2">
      <img :src="product.thumbnail" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text">{{ truncatedDescription }}</p>
        <p class="card-text"><small class="text-muted">{{product.price}} - {{product.offer}}</small></p>
        <RouterLink class="btn btn-info mx-1"  :to="`/products/${product.id}`">عرض المنتج</RouterLink>
      </div>
    </div>
  </div>
</div>
</template>