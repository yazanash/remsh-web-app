<script setup>
import { defineProps, ref, computed } from 'vue';
const props = defineProps({
  item: Object,
});

</script>
<template>
        <tr >
            <th scope="row">{{item.id}}</th>
            <td><div class="ratio ratio-1x1" >
                    <img :src="item.thumbnail"  class="card-img-top" alt="...">
                </div> </td>
            <td class="align-items-center">{{item.name}}</td>
            <td>{{item.size}}</td>
            <td><span class="badge" :style="{ backgroundColor: item.color}">_</span></td>
            <td>{{item.price}}</td>
            <td>{{item.offer}}</td>
            <td>{{item.quantity}}</td>
            <td>{{item.total}}</td>
        </tr>
</template>