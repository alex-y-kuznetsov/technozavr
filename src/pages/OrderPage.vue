<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" v-bind:to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" v-bind:to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ totalProducts }} товар{{ getSuffix(totalProducts)}} </span>
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

          <div class="cart__options" v-if="isCartOptionsShown">
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

        <OrderSummaryBlock />
        
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>

        <div class="form-loader" v-if="isLoaderShown">
            Отправляем Вашу заявку...
          </div>
      </form>
    </section>
  </main>
</template>

<style>
.form-loader {
  padding: 50px;
  text-align: center;
  background-color: #272727;
  color: #ffffff;
}
</style>

<script>
import BaseFormText from "@/components/BaseFormText";
import BaseFormTextarea from "@/components/BaseFormTextarea";
import OrderSummaryBlock from "@/components/OrderSummaryBlock.vue";
import getSuffix from "@/helpers/getSuffix.js"
import axios from 'axios';
import { mapGetters } from "vuex";
import { API_BASE_URL } from '../config';

export default {
  components: { BaseFormText, BaseFormTextarea, OrderSummaryBlock },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      isLoaderShown: false,
      isCartOptionsShown: false,
    };
  },
  computed: {
    ...mapGetters({
      totalProducts: "cartTotalProducts",
    }),
  },
  methods: {
    getSuffix,
    order() {
      this.isLoaderShown = true;
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
          this.isLoaderShown = false;
        })
        .catch(error => {
          this.isLoaderShown = false;
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        })
    },
  },
};
</script>