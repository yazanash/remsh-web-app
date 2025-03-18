<script setup>
import { defineProps, ref, computed } from 'vue';
const props = defineProps({
  user: Object,
});
</script>
<template>
        <tr>
            <td>{{user.email}}</td>
            <td>{{user.name}}</td>
            <td>{{user.group}}</td>
        </tr>
</template>