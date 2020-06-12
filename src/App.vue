/* eslint-disable max-len */
<template>
  <section class="catalog">

    <ProductList v-bind:products="products" />
    <BasePagination v-model="page"
                    v-bind:count="countProducts"
                    v-bind:per-page="productsPerPage" />

  </section>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;

      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
};
</script>
