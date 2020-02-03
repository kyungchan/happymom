import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        locale: "한국어"
    },
    mutations: {
        changeLocale(state, locale) {
            state.locale = locale;
        }
    },
    actions: {},
    modules: {}
});
