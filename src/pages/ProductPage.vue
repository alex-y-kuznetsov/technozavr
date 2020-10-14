<template>
  <main class="content container" v-if="productData">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" v-bind:to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" v-bind:to="{name: 'main', params: { category }}">
            {{ product.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570"
          height="570"
          v-bind:src="product.image.file.url"
          v-bind:alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" v-on:submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset v-if="product.colors" class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li v-for="color in product.colors" v-bind:key="color.id" class="colors__item">
                  <label class="colors__label" v-bind:title="color.title">
                    <input class="colors__radio sr-only"
                    type="radio" name="color-item" v-bind:value="color.title" checked="">
                    <span class="colors__value" v-bind:style="{ 'background-color': color.code }">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset v-if="product.sizes" class="form__block">
              <legend class="form__legend">Объем в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li v-for="size in product.sizes" v-bind:key="size.sizeId" class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item"
                    v-bind:value="size.size">
                    <span class="sizes__value">
                      {{ size.size }}
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар"
                        v-on:click="productAmount > 0 ? productAmount-- : productAmount = 0">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" value="1" v-model.number="productAmount" name="count">

                <button type="button" aria-label="Добавить один товар" v-on:click="productAmount++">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit"
                v-bind:disabled="productAddSending">
                В корзину
              </button>
            </div>
            <div v-if="productAdded">Товар добавлен в корзину</div>
            <div v-if="productAddSending">Добавляем товар в корзину...</div>
          </form>
        </div>
      </div>
      <ProductDescription v-bind:page-params="pageParams"
                          v-bind:product-item="product"/>
    </section>
  </main>
  <main class="content container" v-else-if="productLoading">Загрузка товара...</main>
  <main class="content container"
    v-else-if="productLoadingFailed">Произошла ошибка при загрузке</main>
</template>

<script>
import ProductDescription from '@/components/ProductDescription.vue';
import numberFormat from '@/helpers/filters/numberFormat';
import axios from 'axios';
import { mapActions } from 'vuex';
import { API_BASE_URL } from '../config';

export default {
  components: { ProductDescription },
  data() {
    return {
      pageParams: undefined,
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    ...mapActions(['addProductToCart']),
    getPageParams() {
      this.pageParams = this.$router.currentRoute.params;
    },
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    checkCorrectRoute() {
      if (this.product.id !== this.$router.currentRoute.params.id) {
        this.$router.push({ name: 'notFound' });
      }
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then((response) => this.productData = response.data)
        .catch(() => this.productLoadingFailed = true)
        .then(() => this.productLoading = false);
    },
  },
  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category.id;
    },
  },
  watch: {
    $route() {
      this.checkCorrectRoute();
    },
    '$route.params.id': {
      handler() {
        this.loadProduct();
        this.getPageParams();
      },
      immediate: true,
    },
  },
};
</script>
