<script setup>
import router from '@/router';
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import logo from '@/assets/app_logo.png';
const authStore = useAuthStore();
const form = reactive({
    email: '',
  password: '',
});
const errors = reactive({
  email: null,
  password: null,
});
const error = reactive({
  message: '',
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
  return !errors.email && !errors.password; // Return true if no errors
};
const login = async () => {
  try {
    if (validateForm()) {
      await authStore.login(form.email, form.password);
      router.push('/'); 
      
  }
  } catch (err) {
    error.message = err.message;
    console.error(err);
};
}
  </script>
  

<template>
   
    <div class="text-center">
      <form class="form-signin" @submit.prevent="login">
      <img class="mb-4" :src="logo" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">اهلا بعودتك</h1>
      <!-- <label for="inputEmail" class="sr-only">Email address</label> -->
      <input type="email" id="inputEmail" v-model="form.email" class="form-control mb-3 text-start" placeholder="البريد الالكتروني" required autofocus="">
      <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
      <input type="password" v-model="form.password"  id="inputPassword" class="form-control mb-3" placeholder="كلمة المرور" required>
      <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>
      <div class="mb-3">
        <strong class="text-danger text-center my-3">{{ error.message }}</strong>
      </div>
      <button  :disabled="authStore.operation_loading" class="btn btn-lg btn-primary btn-block" type="submit">
        <span v-if="authStore.operation_loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        تسجيل دخول
      </button>
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