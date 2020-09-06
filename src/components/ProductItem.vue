<template>
  <div>
    <a class="catalog__pic" href="#"
       v-on:click.prevent="emitProductClick()">
      <img v-bind:src="product.image"
           v-bind:alt="product.title"
           v-bind:title="product.title" />
    </a>

    <h3 class="catalog__title">
      <a href="#" v-on:click.prevent="emitProductClick()">{{ product.title }}</a>
    </h3>

    <span class="catalog__price">{{ product.price | numberFormat }} ₽</span>

    <ul v-if="product.colors" class="colors colors--black">
      <li v-for="(color, index) in product.colors"
          v-bind:key="index"
          v-bind:title="color.name"
          class="colors__item">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            v-bind:name="'color-' + (productIndex + 1)"
            v-bind:value="color.hash"
            v-bind:checked="color.checked"
          />
          <span class="colors__value" v-bind:style="{ 'background-color': color.hash }"></span>
        </label>
      </li>
    </ul>
    <ul v-if="product.sizes" class="sizes">
      <li v-for="(sizeItem, index) in product.sizes"
          v-bind:key="index"
          class="sizes__item">
        <label class="sizes__label">
          <input class="sizes__radio sr-only"
                 type="radio"
                 v-bind:name="'sizes-' + (productIndex + 1)"
                 v-bind:value="sizeItem.size"
                 v-bind:checked="sizeItem.checked">
          <span class="sizes__value">
            {{ sizeItem.size }} GB
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style>
  .catalog__pic img {
    object-fit: contain;
  }
</style>

<script>
import numberFormat from '@/helpers/filters/numberFormat';

export default {
  methods: {
    emitProductClick() {
      this.$emit('product-click');
    },
  },
  props: {
    product: {
      type: Object,
    },
    productIndex: {
      type: Number,
    },
  },
  filters: {
    numberFormat,
  },
};
</script>
