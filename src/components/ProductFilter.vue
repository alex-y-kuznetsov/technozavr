<template>
<aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get" v-on:submit.prevent="submit">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price"
                     v-model.number="currentPriceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price"
                     v-model.number="currentPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category"
                      v-model.number="currentCategoryId">
                <option value="0">Все категории</option>
                <option v-for="category in categories"
                        v-bind:key="category.id"
                        v-bind:value="category.id">
                  {{ category.title }}
                </option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет</legend>
            <ul class="colors">
              <li class="colors__item" v-for="color in colors" v-bind:key="color.colorId">
                <label class="colors__label">
                  <input class="colors__radio sr-only"
                         type="radio" name="color" v-bind:value="color.colorId"
                                                   v-model.number="currentColorId">
                  <span class="colors__value" v-bind:style="{ 'background-color': color.hash }">
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Объем в ГБ</legend>
            <ul class="check-list">
              <li class="check-list__item" v-for="size in sizes" v-bind:key="size.sizeName">
                <label class="check-list__label" v-bind:for="'volume_' + size.sizeName">
                  <input class="check-list__check sr-only"
                         type="checkbox" v-bind:id="'volume_' + size.sizeName"
                         v-bind:name="'volume_' + size.sizeName"
                         v-bind:value="size.sizeId"
                         v-model.number="currentSizeId">
                  <span class="check-list__desc">
                    {{ size.sizeName }}
                    <span>({{ productsBySize[size.sizeId] }})</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second" type="button" v-on:click="reset">
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
import categories from '../data/categories';
import colors from '../data/colors';
import sizes from '../data/sizes';

export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
      currentSizeId: [],
      categories,
      colors,
      sizes,
    };
  },
  props: {
    filterPriceFrom: {
      type: Number,
    },
    filterPriceTo: {
      type: Number,
    },
    filterCategoryId: {
      type: Number,
    },
    filterColorId: {
      type: Number,
    },
    filterSizeId: {
      type: Array,
    },
    page: {
      type: Number,
    },
    productsBySize: {
      type: Object,
    },
  },
  watch: {
    filterPriceFrom(value) {
      this.currentPriceFrom = value;
    },
    filterPriceTo(value) {
      this.currentPriceTo = value;
    },
    filterCategoryId(value) {
      this.currentCategoryId = value;
    },
    filterColorId(value) {
      this.currentColorId = value;
    },
    filterSizeId(value) {
      this.currentSizeId = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:page', 1);
      this.$emit('update:filterPriceFrom', this.currentPriceFrom);
      this.$emit('update:filterPriceTo', this.currentPriceTo);
      this.$emit('update:filterCategoryId', this.currentCategoryId);
      this.$emit('update:filterColorId', this.currentColorId);
      this.$emit('update:filterSizeId', this.currentSizeId);
    },
    reset() {
      this.$emit('update:page', 1);
      this.$emit('update:filterPriceFrom', 0);
      this.$emit('update:filterPriceTo', 0);
      this.$emit('update:filterCategoryId', 0);
      this.$emit('update:filterColorId', 0);
      this.$emit('update:filterSizeId', []);
    },
  },
};
</script>
