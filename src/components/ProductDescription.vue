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
    <component v-if="product.descriptions"
               v-bind:product="product"
               v-bind:is="getTabComponentName(shownDescription)" />
    <div v-else class="item__content"> Описания для данного товара отсутствуют</div>
  </div>
</template>

<script>
import products from '@/data/products';
import GeneralTab from '@/components/ProductDescriptionTabs/GeneralTab.vue';
import CharacteristicsTab from '@/components/ProductDescriptionTabs/CharacteristicsTab.vue';
import WarrantyTab from '@/components/ProductDescriptionTabs/WarrantyTab.vue';
import PaymentTab from '@/components/ProductDescriptionTabs/PaymentTab.vue';

export default {
  components: {
    GeneralTab,
    CharacteristicsTab,
    WarrantyTab,
    PaymentTab,
  },
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
    getTabComponentName(descriptionType) {
      switch (descriptionType) {
        case 'general':
          return 'GeneralTab';
        case 'characteristics':
          return 'CharacteristicsTab';
        case 'warranty':
          return 'WarrantyTab';
        case 'payment':
          return 'PaymentTab';
        default:
          return 'GeneralTab';
      }
    },
  },
  created() {
    this.product = this.getProductDescriptions();
  },
};
</script>
