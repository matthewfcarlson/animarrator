import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//import "./registerServiceWorker"; // TODO: service worker should do things?
// import "./scss/custom.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h:any) => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount("#app");
