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
import axios from 'axios';

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
        productsPerPage: 3,
        productsBySize: {},
      },
      productsData: null,
      allProducts: products,
    };
  },
  computed: {
    filteredProducts() {
      const {
        filterPriceFrom, filterPriceTo, filterCategoryId, filterColorId, filterSizeId,
      } = this.filters;
      const applyFilterPriceFrom = (product, _, arr) => (
        filterPriceFrom > 0 ? product.price > filterPriceFrom : arr);
      const applyFilterPriceTo = (product, _, arr) => (
        filterPriceTo > 0 ? product.price < filterPriceTo : arr);
      const applyFilterCategoryId = (product, _, arr) => (
        filterCategoryId ? product.categoryId === filterCategoryId : arr);
      const applyFilterColorId = (product, _, arr) => (
        filterColorId ? product.colors && product.colors.some(
          (color) => color.colorId === filterColorId,
        ) : arr);
      const applyFilterSizeId = (product, _, arr) => (
        filterSizeId && filterSizeId.length ? product.sizes && product.sizes.some(
          (size) => filterSizeId.includes(size.sizeId),
        ) : arr);
      const filteringFunctions = [
        applyFilterPriceFrom,
        applyFilterPriceTo,
        applyFilterCategoryId,
        applyFilterColorId,
        applyFilterSizeId];
      return filteringFunctions.reduce((acc, curr) => acc.filter(curr), products);
    },
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        })) : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
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
    loadProducts() {
      axios.get(`http://vue-study.dev.creonit.ru/api/products?page=${this.filters.page}&limit=${this.filters.productsPerPage}`)
        // eslint-disable-next-line no-return-assign
        .then((response) => this.productsData = response.data);
    },
  },
  watch: {
    'filters.page': function watchPage() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
  mounted() {
    this.countProductsBySize();
  },
};
</script>
