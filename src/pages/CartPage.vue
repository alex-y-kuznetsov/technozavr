<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">Каталог</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Корзина</a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">Количество товаров:
        {{ $store.getters.cartDetailProducts.length }}</span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="cartItem in cartProducts"
                      v-bind:key="cartItem.productId"
                      v-bind:cart-item="cartItem"
                      v-on:product-click="$router.push({
                        name: 'product', params: {id: cartItem.productId}
                        })"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">
            Итого:
            <span>{{totalPrice | numberFormat}} ₽</span>
          </p>

          <router-link tag="button" 
            v-bind:to="{name: 'order'}" 
            class="cart__button button button--primery" 
            v-bind:disabled="!cartProducts.length" 
            type="submit">
            Оформить заказ</router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/filters/numberFormat';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';

export default {
  components: { CartItem },
  filters: { numberFormat },
  computed: {
    ...mapGetters({ cartProducts: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
  },
};
</script>
