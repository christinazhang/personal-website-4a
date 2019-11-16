import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "core-js";
import "core-js/shim";
import "@babel/polyfill";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
