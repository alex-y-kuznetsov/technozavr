<template>
  <header class="header">
    <div class="header__wrapper container">
      <span class="header__info">{{ pageName }}</span>

      <a href class="header__logo" v-on:click.prevent="logoClick()">
        <img
          src="img/svg/logo-tech.svg"
          alt="Логотип интернет магазина Технозавррр"
          width="190"
          height="33"
        />
      </a>

      <a class="header__tel" href="tel:8 800 600 90 09">8 800 600 90 09</a>

      <CartIndicator />
    </div>
  </header>
</template>

<script>
import CartIndicator from '@/components/CartIndicator.vue';
import eventBus from '@/eventBus';

export default {
  components: { CartIndicator },
  props: {
    pageName: {
      type: String,
    },
  },
  methods: {
    logoClick() {
      if (this.$router.currentRoute.name !== 'main') {
        this.$router.push({name: 'main'});
      }
      eventBus.$emit('logo-click');
    }
  },
};
</script>
