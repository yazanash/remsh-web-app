<script setup>
import { defineProps, ref, computed } from 'vue';
const props = defineProps({
  item: Object,
});

</script>
<template>
    <div class="card">
  <div class="card-body row">
    <div class="col-md d-flex">
        <div class="ratio ratio-1x1" >
                    <img :src="item.thumbnail"  class="card-img-top" alt="...">
                </div>
        <h5 class="card-title">{{item.name}}</h5>
    </div>
    <div class="col-md">
        <p class="card-text"> القياس : {{item.size}}</p>
        <p class="card-text"> اللون : <span class="badge" :style="{ backgroundColor: item.color}">_</span></p>
    </div>
   <div class="col-md">
    <p class="card-text"> الكمية : {{item.quantity}}</p>
   </div>
   <div class="col-md">
    <p v-if="!item.hasOfffer" class="card-subtitle mb-2 text-black">السعر : {{item.price}}</p>
    <p v-else class="card-subtitle mb-2 text-black">سعر العرض : {{item.offer}}</p>
    <h6 class="card-text"> الاجمالي : {{item.total}}</h6>
   </div>
  </div>
</div>
</template>