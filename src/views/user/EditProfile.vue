<script setup>
 import { reactive } from 'vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const form = reactive({
    name:'',
    gender:"",
    phone:"",
    birthdate:""
});

const handleSubmit =async () => {
  try{
    if(validateForm()){
      await authStore.updateProfile(form)
      router.push('/profile/create');
    }
  }catch(err){
    error.message=err.message
  }
   
};
onMounted(async () => {
  await authStore.getProfile(); 
  form.name = authStore.profile?.name;
  form.gender = authStore.profile?.gender;
  form.phone = authStore.profile?.phone;
  form.birthdate = authStore.profile?.birthdate;
});
const errors = reactive({
  email: null,
  password: null,
});
const error = reactive({
  message: '',
});
const validateForm = () => {
  errors.name = !form.name
    ? "هذا الحقل مطلوب"
    : null;
    errors.phone = !form.phone
    ? "هذا الحقل مطلوب"
    : null;
  return !errors.phone && !errors.name; // Return true if no errors
};
</script>

<template>
    <div class="container d-flex justify-content-center align-items-center flex-column my-3 ">
    <h2 class="mb-4  row">الصفحة الشخصية</h2>
    <div class="col-md-6 col-sm-12">

    <form @submit.prevent="handleSubmit" class="row g-3">
      <div class="col-md-12">
        <label for="inputEmail4" class="form-label">الاسم</label>
        <input type="text" v-model="form.name" class="form-control" id="inputEmail4">
        <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
      </div>
      <div class="col-md-12">
        <label for="inputPassword4" class="form-label">رقم الهاتف</label>
        <input type="number" v-model="form.phone" class="form-control" id="inputPassword4">
        <span v-if="errors.phone" class="text-danger">{{ errors.phone }}</span>
      </div>
          <div class="col-12">
            <label for="inputEmail4" class="form-label">الجنس</label>

            <div class="form-check">
              <div class="form-check">
          <input v-model="form.gender" value="Male" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
          <label class="form-check-label" for="flexRadioDefault1">
            ذكر
          </label>
        </div>
          <div class="form-check">
            <input v-model="form.gender" value="Female" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
            <label class="form-check-label" for="flexRadioDefault2">
              انثى
            </label>
          </div>
              </div>
            </div>
            <div class="col-md-12">
              <label for="inputPassword4" class="form-label">تاريخ الميلاد</label>
              <input type="date" v-model="form.birthdate" class="form-control" id="inputPassword4">
            </div>
            <div class="mb-3">
                <strong v-if="error.message" class="text-danger">{{ error.message }}</strong>

                </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary float-end">حفظ</button>
            </div>
          </form>
    </div>

  </div>
</template>