<template>
  <div class="item__desc">
    <ul class="tabs">
      <li
        v-for="description in product.descriptions"
        v-bind:key="description.type"
        class="tabs__item"
      >
        <a
          class="tabs__link"
          href="#"
          v-bind:class="{'tabs__link--current': shownDescription === description.type}"
          v-on:click.prevent="showDescription(description.type)"
        >{{ description.title }}</a>
      </li>
    </ul>
    <!--     <div v-for="description in product.descriptions"
         v-bind:key="description.type"
         v-show="shownDescription === description.type" class="item__content">
      <div v-html="description.text"></div>
    </div>-->
    <component v-bind:is="currentShownDescription.component" />
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
      tabs: [],
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
    getDescriptionTabs() {
      this.tabs = this.product.descriptions.map((description) => ({
        name: description.type,
        component: {
          template: `<div>${description.text}</div>`,
        },
      }));
    },
  },
  computed: {
    currentShownDescription() {
      return this.tabs.find((tab) => tab.name === this.shownDescription);
    },
  },
  created() {
    this.product = this.getProductDescriptions();
    this.getDescriptionTabs();
  },
};
</script>
