import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import axios from "axios";
import vuecookies from "vue-cookies";
Vue.use(require("vue-cookies"));
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount("#app");

const token = Vue.$cookies.get("token");
if (token) axios.defaults.headers.common.token = Vue.$cookies.get("token");
else store.state.token = null;
axios.interceptors.response.use(
    res => {
        if (res.data.token) {
            Vue.$cookies.set("token", res.data.token, "1h");
            axios.defaults.headers.common.token = Vue.$cookies.get("token");
        }
        if (res.data.expired) {
            store.commit("signOut");
            Vue.$cookies.remove("token");
            res.data.token = null;
        }
        return Promise.resolve(res);
    },
    err => {
        if (err.response.status === 401) {
            router.push("/signin");
            return;
        }
        return Promise.reject(err);
    }
);
