<template>
    <ul class="catalog__list">
      <li class="catalog__item" v-for="(product, index) in products" v-bind:key="product.id">
        <ProductItem v-bind:product="product" v-bind:productIndex="index"
         v-on:product-click="$router.push({name: 'product', params: {
           id: product.id
           }})"/>
      </li>
    </ul>
</template>

<style>
.sizes {
  margin-top: 10px;
}
</style>

<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: {
    products: {
      type: Array,
    },
  },
};
</script>
