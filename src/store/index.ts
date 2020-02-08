import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from '@/router';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        locale: "한국어",
        role: '',
        token: ''
    },
    mutations: {
        changeLocale(state, locale) {
            state.locale = locale;
        },
        signIn(state, token) {
            state.token = token;
        },
        signOut(state){
            state.token = '';
        },
        signInCheck(state) {
            axios.get("api/auth/me",{
                headers: {
                    'x-access-token': state.token
                }
            })
            .then(
                res =>{
                    state.role = res.data.token.role;
                },
                error =>{
                    router.push("/login")
                }
                
            );
        }
        
    },
    actions: {
    },
    modules: {}
});
