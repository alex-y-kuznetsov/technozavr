import Vue from 'vue';
import App from './App.vue';
import messages from './messages';
import showMessage from './showMessage';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');


showMessage(messages.messageOne);
showMessage(messages.messageTwo);
