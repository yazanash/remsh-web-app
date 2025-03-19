  
<script setup>
import router from '@/router';
import { reactive } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import logo from '@/assets/logo1.png';
const authStore = useAuthStore();
const form = reactive({
    email: '',
  password: '',
  password2:''
});
const errors = reactive({
  email: null,
  password: null,
  password2:null
});
const validateForm = () => {
  errors.email = !form.email
    ? "البريد الالكتروني مطلوب"
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? "خطأ في الايميل"
    : null;
  errors.password = form.password.length < 8
    ? "يجب ان تكون كلمة السر 8 احرف على الاقل"
    : null;
    errors.password2 = form.password2 !==form.password
    ? "كلمة السر غير متطابقة"
    : null;
  return !errors.email && !errors.password && !errors.password2; // Return true if no errors
};
const error=reactive({
  message:''
});
const register = async () => {

  try {
    if (validateForm()) {
    await authStore.register(form.email, form.password,form.password2);
    router.push('/profile/create'); 
  } else {
    error.message = "يرجى تصحيح المدخلات لاتمام العملية"
  }
  } catch (err) {
    error.message = err.message;
    console.log(err.message
    )
    console.error(err.message);
};

}
  
</script>
<template>
    <div class="text-center">
      <form class="form-signin" @submit.prevent="register">
      <img class="mb-4" :src="logo" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">اهلا بك</h1>
      <!-- <label for="inputEmail" class="sr-only">Email address</label> -->
      <input type="email" id="inputEmail" v-model="form.email" class="form-control mb-3" placeholder="ادخل البريد الالكتروني" autofocus="true">
      <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
      <input type="password" v-model="form.password"  id="inputPassword" class="form-control mb-3" placeholder="كلمة المرور" >
      <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>
      <input type="password" v-model="form.password2"  id="inputPassword2" class="form-control mb-3" placeholder="تاكيد كلمة المرور">
      <span v-if="errors.password2" class="text-danger">{{ errors.password2 }}</span>
      <div class="mb-3">
        <strong class="text-danger text-center my-3">{{ error.message }}</strong>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">سجل الان</button>
      <p class="mt-5 mb-3 text-muted">Trioverse 2025 ©</p>
      
    </form>
    </div>
   
  </template>
<style scoped>
.form-signin {
    width: 100%;
    max-width: 400px;
    padding: 15px;
    margin: 0 auto;
}
</style>