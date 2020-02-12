import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NProgress from "nprogress";
import Store from "@/store";
import "@/assets/nprogress.css";
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
        meta: { unauthorized: true },
        component: () => import("../views/Survey.vue")
    },
    {
        path: "/my",
        name: "my",
        meta: { unauthorized: true },
        component: () => import("../views/My.vue")
    },
    {
        path: "/info",
        name: "info",
        component: () => import("../views/Info.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

NProgress.configure({ showSpinner: false });
NProgress.configure({ easing: "ease", speed: 300 });

router.beforeEach(async (to, from, next) => {
    var token = Vue.$cookies.get("token");
    NProgress.start();
    if (token != null) {
        Store.commit("signIn", token);
        Store.commit("loginCheck");
    }
    if (to.matched.some(record => record.meta.unauthorized)) {
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
