import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NProgress from "nprogress";
import Store from "@/store";
import "@/assets/nprogress.css";
import Axios from "axios";
Vue.use(VueRouter);

const routes = [
    {
        path: "*",
        component: Home
    },
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("../views/SignUp.vue"),
        props: { singUp: true }
    },
    {
        path: "/signin",
        name: "signin",
        component: () => import("../views/SignIn.vue"),
        props: { singUp: true }
    },
    {
        path: "/survey",
        name: "survey",
        meta: { auth: true },
        component: () => import("../views/Survey.vue")
    },
    {
        path: "/my",
        name: "my",
        meta: { auth: true },
        component: () => import("../views/My.vue")
    },
    {
        path: "/info",
        name: "info",
        component: () => import("../views/Info.vue")
    },
    {
        path: "/music",
        name: "music",
        component: () => import("../views/Music.vue")
    },
    {
        path: "/image",
        name: "image",
        component: () => import("../views/Gi.vue")
    },
    {
        path: "/admin",
        name: "admin",
        meta: { auth: true, admin: true },
        component: () => import("../views/Admin.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

NProgress.configure({ showSpinner: false });
NProgress.configure({ easing: "ease", speed: 300 });

var env = "";
if (process.env.NODE_ENV == "development") env = "api/";

router.beforeEach(async (to, from, next) => {
    var token = Vue.$cookies.get("token");
    NProgress.start();
    if (token != null) {
        if (Store.state.userid == "") {
            Store.commit("signIn", token);
            Store.commit("loginCheck");
        } else {
            Axios.post(env + "auth/refresh", {
                token: token
            })
                .then(res => {
                    if (res.status == 201) {
                        Store.commit("signIn", token);
                        Store.commit("loginCheck");
                    } else if (res.status == 406) {
                        Store.commit("signOut");
                        Vue.$cookies.remove("token");
                        return next("/signin");
                    }
                })
                .catch(err => {
                    console.log(2);
                    return next("/signin");
                });

            return next();
        }
    }
    if (to.matched.some(record => record.meta.auth)) {
        if (token != null) {
            return next();
        } else {
            return next("/signin");
        }
    } else {
        return next();
    }
});
router.afterEach(() => {
    NProgress.done(true);
});

export default router;
