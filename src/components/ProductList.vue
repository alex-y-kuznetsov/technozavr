<template>
    <ul class="catalog__list">
      <li class="catalog__item" v-for="(product, index) in products" v-bind:key="product.id">
        <ProductItem v-bind:product="product" v-bind:productIndex="index"
                     v-on:product-click="goToPage('product', {id: product.id})"/>
      </li>
    </ul>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: {
    products: {
      type: Array,
    },
  },
  methods: {
    goToPage,
  },
};
</script>
