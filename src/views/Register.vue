  
<script setup>
import router from '@/router';
import { reactive } from 'vue';
import axios from 'axios';
import logo from '@/assets/logo1.png';
const form = reactive({
    email: '',
  password: '',
  password2:''
});

const register = async () => {

  try {
    await authStore.register(form.email, form.password,form.password2);
    router.push('/'); // Redirect after login
  } catch (err) {
    error.message = 'Invalid credentials. Please try again.';
    console.error(err);
};

}
  
</script>
<template>
    <div class="text-center">
      <form class="form-signin" @submit.prevent="register">
      <img class="mb-4" :src="logo" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      <!-- <label for="inputEmail" class="sr-only">Email address</label> -->
      <input type="email" id="inputEmail" v-model="form.email" class="form-control mb-3" placeholder="Email address" required="" autofocus="">
      <!-- <label for="inputPassword" class="sr-only">Password</label> -->
      <input type="password" v-model="form.password"  id="inputPassword" class="form-control mb-3" placeholder="Password" required="">
      <input type="password" v-model="form.password2"  id="inputPassword" class="form-control mb-3" placeholder="Confirm Password" required="">
      <strong class="text-danger text-center">{{ error.message }}</strong>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
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