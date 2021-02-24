import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";

import storage from "good-storage";
// storage.set("__search__","")  //设置
// storage.set("__search__",history)  //设置
// storage.get(key)  //获取
// remove(key) //删除
window.storage = Vue.prototype.$storage = storage;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
