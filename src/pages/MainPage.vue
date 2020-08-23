<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">152 товара</span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-bind.sync="filters"
      />

      <section class="catalog">
        <ProductList v-bind:products="products" />
        <BasePagination
          v-model="filters.page"
          v-bind:count="countProducts"
          v-bind:per-page="filters.productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filters: {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColorId: 0,
        filterSizeId: [],
        page: 1,
        productsPerPage: 2,
        productsBySize: {},
      },
      allProducts: products,
    };
  },
  computed: {
    filteredProducts() {
      const {
        filterPriceFrom, filterPriceTo, filterCategoryId, filterColorId, filterSizeId,
      } = this.filters;
      const applyFilterPriceFrom = ({ price }, _, arr) => (
        filterPriceFrom > 0 ? price > filterPriceFrom : arr);
      const applyFilterPriceTo = ({ price }, _, arr) => (
        filterPriceTo > 0 ? price < filterPriceTo : arr);
      const applyFilterCategoryId = ({ categoryId }, _, arr) => (
        filterCategoryId ? categoryId === filterCategoryId : arr);
      const applyFilterColorId = ({ colors }, _, arr) => (
        filterColorId ? colors && colors.some((color) => color.colorId === filterColorId) : arr);
      const applyFilterSizeId = ({ sizes }, _, arr) => (
        filterSizeId && filterSizeId.length
          ? sizes && sizes.some((size) => filterSizeId.includes(size.sizeId)) : arr);
      const filteringFunctions = [
        applyFilterPriceFrom,
        applyFilterPriceTo,
        applyFilterCategoryId,
        applyFilterColorId,
        applyFilterSizeId];
      return filteringFunctions.reduce((acc, curr) => acc.filter(curr), products);
    },
    products() {
      const offset = (this.filters.page - 1) * this.filters.productsPerPage;

      return this.filteredProducts.slice(offset, offset + this.filters.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    countProductsBySize() {
      const productsWithSizes = this.allProducts.filter(
        (product) => product.sizes,
      );
      const sizes = productsWithSizes.reduce(
        (acc, curr) => [...acc, ...curr.sizes], [],
      ).map((item) => item.sizeId);
      const uniqueSizes = Array.from(new Set(sizes));
      const result = {};
      uniqueSizes.forEach((uniqueSize) => {
        const uniqueCount = sizes.filter((size) => size === uniqueSize).length;
        result[uniqueSize] = uniqueCount;
      });
      this.filters.productsBySize = result;
    },
  },
  mounted() {
    this.countProductsBySize();
  },
};
</script>
