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
      let filteredProducts = products;
      if (this.filters.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filters.filterPriceFrom,
        );
      }
      if (this.filters.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filters.filterPriceTo,
        );
      }
      if (this.filters.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filters.filterCategoryId,
        );
      }
      if (this.filters.filterColorId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.colors && product.colors.some(
            (color) => color.colorId === this.filters.filterColorId,
          ),
        );
      }
      if (this.filters.filterSizeId && this.filters.filterSizeId.length) {
        filteredProducts = filteredProducts.filter(
          (product) => product.sizes && product.sizes.some(
            (size) => this.filters.filterSizeId.includes(size.sizeId),
          ),
        );
      }
      return filteredProducts;
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
