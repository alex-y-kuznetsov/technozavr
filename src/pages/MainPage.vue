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
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">
          <div>Произошла ошибка при загрузке товаров</div>
          <button v-on:click.prevent="loadProducts">Попробовать еще раз</button>
        </div>
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
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import productSizes from '@/data/productSizes';
import axios from 'axios';
import { API_BASE_URL } from '../config';

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
      allProductsBySize: [],
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
          sizes: productSizes.find((productWithSizes) => productWithSizes.id === product.id)
            ? productSizes.find((productWithSizes) => productWithSizes.id === product.id).sizes
            : null,
        })) : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    countProductsBySize() {
      const sizes = productSizes.reduce(
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
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.filters.page,
            limit: this.filters.productsPerPage,
            categoryId: this.filters.filterCategoryId,
            colorId: this.filters.filterColorId,
            minPrice: this.filters.filterPriceFrom,
            maxPrice: this.filters.filterPriceTo,
          },
        })
        // eslint-disable-next-line no-return-assign
          .then((response) => this.productsData = response.data)
          // eslint-disable-next-line no-return-assign
          .catch(() => this.productsLoadingFailed = true)
          // eslint-disable-next-line no-return-assign
          .then(() => this.productsLoading = false);
      }, 0);
    },
    loadAllProductsBySize() {
      axios.get(`${API_BASE_URL}/api/products`)
        // eslint-disable-next-line no-return-assign
        .then((response) => this.allProductsBySize = response.data.items)
        .then(this.allProductsBySize.map((product) => ({
          ...product,
          sizes: productSizes.find((productWithSizes) => productWithSizes.id === product.id)
            ? productSizes.find((productWithSizes) => productWithSizes.id === product.id).sizes
            : null,
        })));
    },
  },
  watch: {
    'filters.page': function watchPage() {
      this.loadProducts();
    },
    'filters.filterPriceFrom': function watchPriceFrom() {
      this.loadProducts();
    },
    'filters.filterPriceTo': function watchPriceTo() {
      this.loadProducts();
    },
    'filters.filterCategoryId': function watchCategoryId() {
      this.loadProducts();
    },
    'filters.filterColorId': function watchColorId() {
      this.loadProducts();
    },
    'filters.filterSizeId': function watchSizeId() {
      this.loadAllProductsBySize();
    },
  },
  created() {
    this.loadProducts();
    this.loadAllProductsBySize();
    this.countProductsBySize();
  },
};
</script>
