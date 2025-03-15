
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import SignUp from '@/views/Register.vue';
import Home from '@/views/Home.vue';
import ProductList from '@/views/product/ProductList.vue';
import AddProduct from '@/views/product/AddProduct.vue';
import OrdersList from '@/views/order/OrdersList.vue';
import OrderDetails from '@/views/order/OrderDetails.vue';
import categoryList from '@/views/category/categoryList.vue';
import CouponList from '@/views/coupon/CouponList.vue';
import DeliveryList from '@/views/Delivery/DeliveryList.vue';
import EditProduct from '@/views/product/EditProduct.vue';
import ProductDetails from '@/views/product/ProductDetails.vue';
import Profile from '@/views/user/Profile.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/login',
            name: 'Login',
            component: Login,
            meta: { requiresUnauthenticated: true }
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
        meta: { requiresUnauthenticated: true }
      },
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true }
      },
      {
        path: '/categories',
        name: 'Categories',
        component: categoryList,
        meta: { requiresAuth: true }
      },
      {
        path: '/products',
        name: 'Products',
        component: ProductList,
        meta: { requiresAuth: true }
      },
      {
        path: '/products/:id',
        name: 'ProductDetails',
        component: ProductDetails,
        meta: { requiresAuth: true }
      },
      {
        path: '/products/edit/:id',
        name: 'Product.edit',
        component: EditProduct,
        meta: { requiresAuth: true }
      },
      {
        path: '/products/create',
        name: 'Products.create',
        component: AddProduct,
        meta: { requiresAuth: true }
      },
      {
        path: '/orders',
        name: 'Orders',
        component: OrdersList,
        meta: { requiresAuth: true }
      },
      {
        path: '/orders/:id',
        name: 'OrderDetails',
        component: OrderDetails,
        meta: { requiresAuth: true }
      },
      {
        path: '/coupons',
        name: 'Coupons',
        component: CouponList,
        meta: { requiresAuth: true }
      },
      {
        path: '/delivery',
        name: 'Delivery',
        component: DeliveryList,
        meta: { requiresAuth: true }
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
      },
    ],
  });
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = !!authStore.access || !!localStorage.getItem('access');
    if (to.meta.requiresAuth && !isAuthenticated) {
      // Redirect unauthenticated users trying to access protected routes
      console.log(isAuthenticated)
      authStore.logout();
      next('/login');
    } else if (to.meta.requiresUnauthenticated && isAuthenticated) {
      // Redirect authenticated users trying to access unauthenticated routes
      next('/');
    } else {
      // Proceed as normal
      next();
    }
  });
  export default router;