<template>
  <div v-bind:data-page="pageName">
    <PageHeader v-bind:page-name="pageName"/>
    <router-view />
    <PageFooter />

  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
import { mapActions, mapMutations } from 'vuex';

const destinations = {
  main: 'Каталог',
  product: 'Каталог',
  cart: 'Корзина',
  notFound: 'Страница не найдена',
  order: 'Оформление заказа',
};

export default {
  components: { PageHeader, PageFooter },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
  computed: {
    pageName() {
      return destinations[this.$route.name];
    },
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
};
</script>
