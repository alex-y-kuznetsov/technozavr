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
            <li
              class="cart__item product"
              v-for="cartItem in cartProducts"
              v-bind:key="cartItem.productId"
            >
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
                <button type="button" aria-label="Убрать один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus" />
                  </svg>
                </button>

                <input type="text" value="1" v-model="cartItem.amount" name="count" />

                <button type="button" aria-label="Добавить один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus" />
                  </svg>
                </button>
              </div>

              <b
                class="product__price"
              >{{ (cartItem.product.price * cartItem.amount) | numberFormat }} ₽</b>

              <button
                class="product__del button-del"
                type="button"
                aria-label="Удалить товар из корзины"
              >
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close" />
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">
            Итого:
            <span>{{totalPrice | numberFormat}} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/filters/numberFormat';
import { mapGetters } from 'vuex';

export default {
  filters: { numberFormat },
  computed: {
    ...mapGetters({ cartProducts: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
  },
};
</script>
