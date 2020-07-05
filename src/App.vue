/* eslint-disable no-console */
/* eslint-disable */

<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">152 товара</span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-bind:price-from.sync="filterPriceFrom"
        v-bind:price-to.sync="filterPriceTo"
        v-bind:category.sync="filterCategoryId"
        v-bind:colorId.sync="filterColorId"
        v-bind:sizeId.sync="filterSizeId"
        v-bind:page.sync="page"
        v-bind:all-products="allProducts"
        v-bind:products-by-size="productsBySize"
      />

      <section class="catalog">
        <ProductList v-bind:products="products" />
        <BasePagination
          v-model="page"
          v-bind:count="countProducts"
          v-bind:per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      filterSizeId: [],
      page: 1,
      productsPerPage: 2,
      productsBySize: {},
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom,
        );
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filterPriceTo,
        );
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId,
        );
      }
      if (this.filterColorId) {
        const localThis = this;
        const productsWithColors = filteredProducts.filter(
          (product) => product.colors,
        );
        const newArr = [];
        productsWithColors.forEach((item) => {
          item.colors.forEach((color) => {
            if (color.colorId === localThis.filterColorId) {
              newArr.push(item);
            }
          });
        });
        filteredProducts = newArr;
      }
      if (this.filterSizeId && this.filterSizeId.length) {
        const localThis = this;
        const productsWithSizes = filteredProducts.filter(
          (product) => product.sizes,
        );
        const newArr = [];
        productsWithSizes.forEach((item) => {
          item.sizes.forEach((size) => {
            if (localThis.filterSizeId.includes(size.sizeId)) {
              newArr.push(item);
            }
          });
        });
        filteredProducts = Array.from(new Set(newArr));
      }
      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;

      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    allProducts() {
      return products;
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
      this.productsBySize = result;
    },
  },
  mounted() {
    this.countProductsBySize();
  },
};
</script>
