<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html"> Корзина </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> 3 товара </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" v-on:submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              v-model="formData.name"
              title="ФИО"
              v-bind:error="formError.name"
              placeholder="Введите ваше полное имя"
            />
            <BaseFormText
              v-model="formData.address"
              title="Адрес доставки"
              v-bind:error="formError.address"
              placeholder="Введите ваш адрес"
            />
            <BaseFormText
              v-model="formData.phone"
              title="Телефон"
              type="tel"
              v-bind:error="formError.phone"
              placeholder="Введите ваш телефон"
            />
            <BaseFormText
              v-model="formData.email"
              title="Email"
              v-bind:error="formError.email"
              placeholder="Введите ваш Email"
            />
            <BaseFormTextarea
              title="Комментарий к заказу"
              v-model="formData.comment"
              v-bind:error="formError.comment"
              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="500"
                  />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="card"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="cash"
                  />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="cartProductItem in $store.state.cartProductsData" v-bind:key="cartProductItem.id">
              <h3>{{ cartProductItem.product.title }} 
                <b v-if="cartProductItem.quantity > 1">({{ cartProductItem.quantity }})</b></h3>
              <b>{{ cartProductItem.price }}</b>
              <span>Артикул: {{ cartProductItem.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{ deliveryCost }} ₽</b></p>
            <p>Итого: <b>{{ totalProducts }}</b> товар{{ getSuffix() }} на сумму <b>{{ totalPrice + deliveryCost | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from "@/components/BaseFormText";
import BaseFormTextarea from "@/components/BaseFormTextarea";
import axios from 'axios';
import { API_BASE_URL } from '../config';
import numberFormat from '@/helpers/filters/numberFormat';
import { mapGetters } from 'vuex';

export default {
  components: { BaseFormText, BaseFormTextarea },
  filters: { numberFormat },
  data() {
    return {
      formData: {},
      formError: {},
      deliveryCost: 500,
      formErrorMessage: '',
    };
  },
  computed: {
    ...mapGetters({ totalPrice: 'cartTotalPrice', totalProducts: 'cartTotalProducts' }),
  },
  methods: {
    getSuffix() {
      switch(this.totalProducts) {
        case 1 : 
          return '';
          break;

        case 2:
        case 3:
        case 5:
          return 'а';
          break;

        default:
          return 'ов';
          break;
      }
    },
    order() {
      this.formError = {};
      this.formEerrorMessage = '';
      axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData
        },  {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        })
        .then(response => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({name: 'orderInfo', params: {id: response.data.id}});
        })
        .catch(error => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        })
    },
  },
};
</script>