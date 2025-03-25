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
const loading_active=ref(false)
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
const handleActivateItem = async (status) => {
  
  try {
    loading_active.value=true;
    if(status===true){
      await productDataStore.activateItem(itemId,false);

    }else{
      await productDataStore.activateItem(itemId,true);
    }
  } catch (err) {
    console.error('Error adding product:', err);
  }
  finally{
    loading_active.value=false;
  }
};

</script>
<template>
        <tr >
            <th scope="row">{{item.id}}</th>
            <td>{{item.size}}</td>
            <td><span class="badge" :style="{ backgroundColor: item.color,color:item.color}"> - </span></td>
            <td>
              <button :disabled="loading_active" @click="handleActivateItem(item.is_active)" v-if="item.is_active" class="btn btn-danger">
                <span v-if="loading_active" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                الغاء التفعيل
               </button>
               <button :disabled="loading_active" @click="handleActivateItem(item.is_active)" v-else class="btn btn-secondary">
                <span v-if="loading_active" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          تفعيل
               </button>
                <button :disabled="isloading||productDataStore.itemdeleteloading" @click="handleDeleteItem" type="submit" class="btn btn-danger mx-1">
                        <span v-if="isloading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <i v-else class="pi pi-trash"></i>
                </button>
            </td>
        </tr>
</template>