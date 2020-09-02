import Vue from 'vue';
import App from './App';
import uView from "uview-ui";
import axios from "axios-miniprogram";
import Router from './router/index.js'
Vue.use(uView);

Vue.config.productionTip = false;

App.mpType = 'app';
const app = new Vue({
  ...App,
  Router
});
app.$mount();
