<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#" v-on:click.prevent="goToPage('main')">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#" v-on:click.prevent="goToPage('main')">
            {{ category.title }}
          </a>
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
          v-bind:src="product.image"
          v-bind:alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset v-if="product.colors" class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li v-for="color in product.colors" v-bind:key="color.colorId" class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                    type="radio" name="color-item" v-bind:value="color.name" checked="">
                    <span class="colors__value" v-bind:style="{ 'background-color': color.hash }">
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
                <button type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" value="1" name="count">

                <button type="button" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>
      <ProductDescription v-bind:page-params="pageParams"
                          v-bind:product-item="product"/>
    </section>
  </main>
</template>

<script>
import products from '@/data/products';
import categories from '@/data/categories';
import ProductDescription from '@/components/ProductDescription.vue';
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/filters/numberFormat';

export default {
  components: { ProductDescription },
  props: {
    pageParams: {
      type: Object,
    },
  },
  filters: {
    numberFormat,
  },
  methods: {
    goToPage,
  },
  computed: {
    product() {
      return products.find((product) => product.id === this.pageParams.id);
    },
    category() {
      return categories.find((category) => category.id === this.product.categoryId);
    },
  },
};
</script>