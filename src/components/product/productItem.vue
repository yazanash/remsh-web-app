<script setup>
import { defineProps, ref, computed } from 'vue';
import { useProductDataStore } from "@/stores/product_data";
const productDataStore = useProductDataStore();
const props = defineProps({
    item: Object,
    id:Number
});
const itemId = props.id
const isloading =ref(false)

const handleDeleteItem = async () => {
  try {
    isloading.value=true;
    await productDataStore.deleteItem(itemId);
  } catch (err) {
    console.error('Error adding product:', err);
  }
  finally{
    isloading.value=false;
  }
};

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
            <td>
                <button :disabled="isloading||productDataStore.itemdeleteloading" @click="handleDeleteItem" type="submit" class="btn btn-danger">
                        <span v-if="isloading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <i v-else class="pi pi-trash"></i>
                </button>
            </td>
        </tr>
</template>