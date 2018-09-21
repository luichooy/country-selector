import Vue from 'vue';
import App from './App.vue';
// import 'vue-country-selector/dist/CountrySelector.css';
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
