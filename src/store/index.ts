import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";
Vue.use(Vuex);

var env = "";
if (process.env.NODE_ENV == "development") env = "api/";

export default new Vuex.Store({
    state: {
        locale: "한국어",
        userid: "",
        username: "",
        email: "",
        role: "",
        create_time: "",
        token: null
    },
    mutations: {
        changeLocale(state, locale) {
            state.locale = locale;
        },
        signIn(state, token) {
            state.token = token;
        },
        signOut(state) {
            state.token = null;
            state.userid = "";
            state.username = "";
            state.email = "";
            state.role = "";
            state.create_time = "";
        },
        loginCheck(state) {
            axios
                .post(env + "auth/check", {
                    headers: {
                        "x-access-token": state.token
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        state.userid = res.data.decoded.userid;
                        state.username = res.data.decoded.username;
                        state.email = res.data.decoded.email;
                        state.role = res.data.decoded.role;
                        state.create_time = res.data.decoded.create_time;
                    }
                });
        }
    },
    actions: {},
    modules: {}
});
