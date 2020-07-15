<template>
  <div class="item__desc">
    <ul class="tabs">
      <li v-for="description in product.descriptions"
          v-bind:key="description.type" class="tabs__item">
        <a class="tabs__link" href="#"
           v-bind:class="{'tabs__link--current': shownDescription === description.type}"
           v-on:click.prevent="showDescription(description.type)">
          {{ description.title }}
        </a>
      </li>
    </ul>
    <div v-for="description in product.descriptions"
         v-bind:key="description.type"
         v-show="shownDescription === description.type" class="item__content">
      <div v-html="description.text"></div>
    </div>
  </div>
</template>

<script>
import products from '@/data/products';

export default {
  props: {
    pageParams: {
      type: Object,
    },
  },
  data() {
    return {
      product: {},
      shownDescription: 'general',
    };
  },
  methods: {
    getProductDescriptions() {
      return products.find((product) => product.id === this.pageParams.id);
    },
    showDescription(type) {
      this.shownDescription = type;
    },
  },
  created() {
    this.product = this.getProductDescriptions();
  },
};
</script>
