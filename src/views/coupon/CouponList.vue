<script setup>
import { ref,reactive } from 'vue';
import * as bootstrap from "bootstrap";
import { onMounted } from 'vue';
import { useCouponStore } from '@/stores/coupon';
import { formatDistanceToNow, parseISO } from "date-fns";
const couponStore = useCouponStore();

const form = reactive({
    id:'',
    code:'',
    percent:0,
    expire:'',
    count:-1
});


const error = reactive({
  message: '',
});
const errors = reactive({
  code:null,
    percent:null,
    expire:null,
    count:null
});

const validateForm = () => {
  errors.code = !form.code || form.code.trim() === ""
    ? "هذا الحقل مطلوب" 
    : null;

    errors.percent = form.percent <=0
    ? "هذا الحقل مطلوب" 
    : null;
  return !errors.code||!errors.percent; // Return true if no errors
};




const isEditing = reactive({ value: false });
const openModal = (mode, coupon = null) => {
  isEditing.value = mode === "edit";
  if (isEditing.value && coupon) {
    form.code = coupon.code;
    form.percent = coupon.percent;
    const initialDate = new Date(coupon.expire);
    form.expire = initialDate.toISOString().slice(0, 16);
    form.count = coupon.count;
    form.id = coupon.id;
  } else {
    form.code = "";
    form.percent = "";
    form.expire = '';
    form.count = '';
  }
  const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
  modal.show();
};

const handleSubmit =async () => {
  try{
    if(validateForm()){
      if (isEditing.value && form.id) {
        await couponStore.editCoupon(form.id,form);
      }
      else{
        await couponStore.addCoupon(form)
      }
      form.id = null;
      form.code = "";
      form.percent = "";
      form.expire = '';
      form.count = '';
      const modal = bootstrap.Modal.getInstance(document.getElementById("categoryModal"));
      modal.hide();
    }
  }catch(err){
    error.message = err.message;
    console.error(err);
  }
  
};
const formatDate=(isoDate) =>{
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localDate = new Date(isoDate).toLocaleString("en-US", { timeZone: userTimeZone });

  return formatDistanceToNow(new Date(localDate), { addSuffix: true });
    };
onMounted(async () => {
  await couponStore.fetchCoupons(); // Fetch products when the component is mounted
});
</script>
<template>
<div class="container p-3 rounded bg-white">
    <div class="d-flex flex-row justify-content-between">
        <h3>الكوبونات</h3>
        <a @click="openModal('add')" class='btn btn-primary'>اضافة كوبون</a>
    </div>
    
<hr/>
<div class="modal fade " id="categoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing.value ? 'تعديل كوبون' : 'اضافة كوبون' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
                <div class="col-md-6 mb-3">
                    <label for="productName" class="form-label">الرمز</label>
                    <input type="text" v-model="form.code" class="form-control" id="productName" placeholder="مثال : remsh30" required>
                    <span v-if="errors.code" class="text-danger">{{ errors.code }}</span>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="productName" class="form-label">نسبة الحسم</label>
                    <input type="number" v-model="form.percent" class="form-control" id="productName" placeholder="ادخل نسبة الحسم%" required>
                    <span v-if="errors.percent" class="text-danger">{{ errors.percent }}</span>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="productName" class="form-label">تاريخ نهاية الكوبون</label>
                    <input type="datetime-local" v-model="form.expire" class="form-control" id="productName" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="productName" class="form-label">العدد </label>
                    <input type="number" v-model="form.count" class="form-control" id="productName" placeholder="اتركه فارغا في حالة ان الكوبون غير محدود العدد">
                </div>
                <div class="mb-3">
                  <strong class="text-danger text-center my-3">{{ error.message }}</strong>
                </div>
              <button type="submit" class="btn btn-primary">
                <span v-if="couponStore.loadingoperation" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ isEditing.value ? 'تعديل' : 'حفظ' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="couponStore.loading">
      <div class="d-flex justify-content-center align-items-center">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-if="couponStore.error">{{ couponStore.error }}</div>
        <div v-if="!couponStore.loading && !couponStore.error" class="border table-responsive rounded p-1">
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">الرمز</th>
                            <th scope="col">النسبة</th>
                            <th scope="col">تاريخ الانتهاء</th>
                            <th scope="col">العدد</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in couponStore.coupons" :key="item.id">
                            <th scope="row">{{item.id}}</th>
                            <td>{{item.code}}</td>
                            <td>{{item.percent}} %</td>
                            <td>{{formatDate(item.expire)}}</td>
                            <td v-if="item.count>=0"> {{item.count}}</td>
                            <td v-else>غير محدود</td>
                            <td>
                                <a class="btn btn-primary"   @click="openModal('edit', item)"><i class="pi pi-pencil"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
</div>
</template>