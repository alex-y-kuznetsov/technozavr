<template>
  <div>
    <PageHeader v-bind:page-name="pageName"/>
    <router-view />
    <PageFooter />

  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';

const destinations = {
  main: 'Каталог',
  product: 'Каталог',
  cart: 'Корзина',
  notFound: 'Страница не найдена',
};

export default {
  components: { PageHeader, PageFooter },
  computed: {
    pageName() {
      return destinations[this.$route.name];
    },
  },
};
</script>
