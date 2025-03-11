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
        <tr>
            <th scope="row">{{product.id}}</th>
            <td><div class="ratio ratio-1x1" >
                    <img :src="product.thumbnail" class="card-img-top" alt="...">
                </div> </td>
            <td>{{product.name}}</td>
            <td>{{ truncatedDescription }}</td>
            <td>{{product.price}}</td>
            <td>{{product.offer}}</td>
            <td>
              <RouterLink class="btn btn-info mx-1"  :to="`/products/${product.id}`"><i class="pi pi-eye"></i></RouterLink>
              <RouterLink class="btn btn-primary mx-1"  :to="`/products/edit/${product.id}`"><i class="pi pi-pencil"></i></RouterLink>
              <RouterLink class="btn btn-danger mx-1"  :to="`/products/view`"><i class="pi pi-trash"></i></RouterLink>
            </td>
        </tr>
</template>