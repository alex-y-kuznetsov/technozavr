<template>
    <ul class="catalog__list">
      <li class="catalog__item" v-for="(product, index) in products" v-bind:key="product.id">
        <ProductItem v-bind:product="product" v-bind:productIndex="index"
                     @goToPage="(pageName, pageParams) => $emit('goToPage', pageName, pageParams)"/>
      </li>
    </ul>
</template>

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
