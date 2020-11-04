<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li
        class="cart__order"
        v-for="cartProductItem in cartProductItems"
        v-bind:key="cartProductItem.id"
      >
        <h3>
          {{ cartProductItem.product.title }}
          <b v-if="cartProductItem.quantity > 1"
            >({{ cartProductItem.quantity }})</b
          >
        </h3>
        <b>{{ cartProductItem.price }}</b>
        <span>Артикул: {{ cartProductItem.id }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>
        Доставка: <b>{{ deliveryCost }} ₽</b>
      </p>
      <p>
        Итого: <b>{{ totalProducts }}</b> товар{{ getSuffix() }} на сумму
        <b>{{ (totalPrice + deliveryCost) | numberFormat }} ₽</b>
      </p>
    </div>

    <button class="cart__button button button--primery" 
            type="submit"
            v-if="$route.name !== 'orderInfo'"
            v-bind:disabled="!$store.state.cartProducts.length" >
      Оформить заказ
    </button>
    <router-link v-else tag="button" 
                class="cart__button button button--primery" 
                v-bind:to="{name: 'main'}">
      Вернуться в каталог
    </router-link>

  </div>
</template>

<script>
import numberFormat from "@/helpers/filters/numberFormat";
import { mapGetters } from "vuex";

export default {
  filters: { numberFormat },
  computed: {
    ...mapGetters({
      totalPrice: "cartTotalPrice",
      totalProducts: "cartTotalProducts",
    }),
    cartProductItems() {
      if (this.$router.currentRoute.name === 'order') {
        return this.$store.state.cartProductsData;
      } else if (this.$router.currentRoute.name === 'orderInfo') {
        return this.$store.state.orderInfo.basket.items;
      } else {
        return {};
      }
    },
  },
  data() {
    return {
      deliveryCost: 500,
    };
  },
  methods: {
    getSuffix() {
      switch (this.totalProducts) {
        case 1:
          return "";
          break;

        case 2:
        case 3:
        case 5:
          return "а";
          break;

        default:
          return "ов";
          break;
      }
    },
  },
};
</script>