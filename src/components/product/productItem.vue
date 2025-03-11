<script setup>
import { defineProps, ref, computed } from 'vue';
const props = defineProps({
    item: Object,
});
</script>
<template>
        <tr >
            <th scope="row">{{item.id}}</th>
            <td>{{item.size}}</td>
            <td><span class="badge" :style="{ backgroundColor: item.color,color:item.color}"> - </span></td>
            <td>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" :checked="item.isActive" id="flexCheckDefault">
                    <label class="form-check-label"  for="flexCheckDefault">
                        Active
                    </label>
                </div>
            </td>
        </tr>
</template>