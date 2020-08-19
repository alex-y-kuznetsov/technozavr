<template>
  <li class="cart__item product" v-on:click="emitProductClick()">
    <div class="product__pic">
      <img
        v-bind:src="cartItem.product.image"
        width="120"
        height="120"
        v-bind:alt="cartItem.product.title"
      />
    </div>
    <h3 class="product__title">{{ cartItem.product.title }}</h3>
    <span class="product__code">Артикул: {{ cartItem.product.id }}</span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар"
              v-on:click.stop="productAmount > 1 ?
              productAmount-- : deteteProduct(cartItem.productId)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus" />
        </svg>
      </button>

      <input type="text" value="1" v-model.number="productAmount" name="count" />

      <button type="button" aria-label="Добавить один товар" v-on:click.stop="productAmount++">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus" />
        </svg>
      </button>
    </div>

    <b class="product__price">{{ (cartItem.product.price * cartItem.amount) | numberFormat }} ₽</b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
            v-on:click.prevent="deteteProduct(cartItem.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close" />
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/filters/numberFormat';
import { mapMutations } from 'vuex';

export default {
  filters: { numberFormat },
  props: {
    cartItem: {
      type: Object,
    },
  },
  methods: {
    ...mapMutations({ deteteProduct: 'deleteCartProduct' }),
    emitProductClick() {
      this.$emit('product-click');
    },
  },
  computed: {
    productAmount: {
      get() {
        return this.cartItem.amount;
      },
      set(value) {
        this.$store.commit('updateCartProductAmount', { productId: this.cartItem.productId, amount: value });
      },
    },
  },
};
</script>
