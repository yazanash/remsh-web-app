
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
import EditProfile from '@/views/user/EditProfile.vue';
import Admins from '@/views/user/Admins.vue';
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
        meta: { requiresAuth: true , allowedGroups: ['admin', 'supervisor']}
      },
      {
        path: '/categories',
        name: 'Categories',
        component: categoryList,
        meta: { requiresAuth: true , allowedGroups: ['admin', 'supervisor']}
      },
      {
        path: '/products',
        name: 'Products',
        component: ProductList,
        meta: { requiresAuth: true, allowedGroups: ['admin', 'supervisor','data_entry'] }
      },
      {
        path: '/products/:id',
        name: 'ProductDetails',
        component: ProductDetails,
        meta: { requiresAuth: true , allowedGroups: ['admin', 'supervisor','data_entry']}
      },
      {
        path: '/products/edit/:id',
        name: 'Product.edit',
        component: EditProduct,
        meta: { requiresAuth: true , allowedGroups: ['admin', 'supervisor','data_entry']}
      },
      {
        path: '/products/create',
        name: 'Products.create',
        component: AddProduct,
        meta: { requiresAuth: true , allowedGroups: ['admin', 'supervisor','data_entry']}
      },
      {
        path: '/orders',
        name: 'Orders',
        component: OrdersList,
        meta: { requiresAuth: true , allowedGroups: ['admin', 'supervisor','data_entry']}
      },
      {
        path: '/orders/:id',
        name: 'OrderDetails',
        component: OrderDetails,
        meta: { requiresAuth: true , allowedGroups: ['admin', 'supervisor','data_entry']}
      },
      {
        path: '/coupons',
        name: 'Coupons',
        component: CouponList,
        meta: { requiresAuth: true , allowedGroups: ['admin', 'supervisor']}
      },
      {
        path: '/delivery',
        name: 'Delivery',
        component: DeliveryList,
        meta: { requiresAuth: true , allowedGroups: ['admin', 'supervisor']}
      },
      {
        path: '/profile',
        name: 'Profile',
        component: EditProfile,
        meta: { requiresAuth: true ,requireProfile: true, allowedGroups: ['admin', 'supervisor','data_entry']}
      },
      {
        path: '/profile/create',
        name: 'ProfileCreate',
        component: Profile,
        meta: { requiresAuth: true ,requireProfile: false, allowedGroups: ['admin', 'supervisor','data_entry']}
      },
      {
        path: '/users',
        name: 'Users',
        component: Admins,
        meta: { requiresAuth: true ,requireProfile: false, allowedGroups: ['admin'] }
      },
    ],
  });

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    // Check if the user is authenticated
    const isAuthenticated = !!authStore.access || !!localStorage.getItem('access');
    const hasProfile = authStore.profile !== null
    console.log(authStore.profile)
    console.log(hasProfile)
    if (to.meta.requiresAuth && !isAuthenticated) {
        // Redirect unauthenticated users trying to access protected routes
        authStore.logout();
        next('/login');
    }
    else if(to.meta.requireProfile&&!hasProfile){
       authStore.getProfile()
      if(authStore.profile !== null)
      {
        next()
      }else{
      next('/profile/create');

      }
    }
     else if (to.meta.requiresUnauthenticated && isAuthenticated) {
        // Redirect authenticated users trying to access unauthenticated routes
        next('/');
    } else if (to.meta.allowedGroups) {
        // Check the user's group against allowed groups for the route
        const userGroup = authStore.group; // Assuming group is stored in Pinia authStore
        console.log(userGroup)
        if (!to.meta.allowedGroups.includes(userGroup)) {
            // Redirect the user if their group is not authorized
            console.log(`Access denied for group: ${userGroup}`);
            next('/unauthorized'); // Redirect to an unauthorized page or home
        } else {
            next(); // Allow access if the group is authorized
        }
    } else {
        // Proceed as normal
        next();
    }
});
  export default router;