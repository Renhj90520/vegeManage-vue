// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "./assets/css/bootstrap.min.css";
import "./assets/js/bootstrap";
import VeeValidate from "vee-validate";

Vue.config.productionTip = false;
Vue.filter("mydate", value => {
  return value.replace("T", " ").substring(0, 19);
});
Vue.filter("orderstate", value => {
  switch (value) {
    case 0:
      return "未联系";
    case 1:
      return "派送中";
    case 2:
      return "交易取消";
    case 3:
      return "交易完成";
  }
});
Vue.use(VeeValidate);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});
