<template>
  <router-link
    v-bind:to="{name: 'cart'}"
    class="header__cart"
    aria-label="Корзина с товарами"
  >
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart" />
    </svg>
    <span v-if="$store.state.cartProducts.length" class="header__count"
          aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
  </router-link>
</template>

<script>
export default {};
</script>
