<template>
  <div class="cart__block" v-if="isBlockRendered">
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
        Итого: <b>{{ totalProductsToShow }}</b> товар{{ getSuffix() }} на сумму
        <b>{{ (totalPriceToShow + deliveryCost) | numberFormat }} ₽</b>
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
    isBlockRendered() {
      if (!this.isOrderFinal) {
        return true;
      } else {
        if (this.isOrderFinal && this.$store.state.orderInfo) {
          return true;
        } else {
          return false;
        }
      }
    },
    isOrderFinal() {
      return this.$router.currentRoute.name === 'orderInfo';
    },
    totalProductsToShow() {
      return this.isOrderFinal ? this.$store.state.orderAmount : this.totalProducts;
    },
    totalPriceToShow() {
      return this.isOrderFinal ? this.$store.state.orderInfo.totalPrice : this.totalPrice;
    },
    cartProductItems() {
      return this.isOrderFinal ? this.$store.state.orderInfo.basket.items : this.$store.state.cartProductsData;
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
        case 4:
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