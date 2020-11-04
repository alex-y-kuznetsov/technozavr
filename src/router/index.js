import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    component: MainPage,
    path: '/',
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id',
  },
  {
    name: 'cart',
    component: CartPage,
    path: '/cart',
  },
  {
    name: 'notFound',
    component: NotFoundPage,
    path: '/404',
  },
  {
    path: '*',
    redirect: '/404',
  },
  {
    name: 'order',
    component: OrderPage,
    path: '/order',
  },
  {
    name: 'orderInfo',
    component: OrderInfoPage,
    path: '/order/:id',
  }
];

const router = new VueRouter({
  routes,
});

export default router;
