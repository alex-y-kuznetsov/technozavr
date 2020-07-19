<template>
    <div class="item__content" v-html="description.text"></div>
</template>

<script>
import getTabData from '@/helpers/getTabData';

export default {
  props: {
    product: {
      type: Object,
    },
  },
  data() {
    return {
      tabType: 'payment',
      description: {},
    };
  },
  methods: {
    getTabData,
  },
  created() {
    this.description = getTabData(this.product, this.tabType);
  },
};
</script>
