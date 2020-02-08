import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NProgress from "nprogress";
import "@/assets/nprogress.css";
Vue.use(VueRouter);

const routes = [
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
        component: () => import("../views/Survey.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

NProgress.configure({ showSpinner: false });
NProgress.configure({ easing: "ease", speed: 300 });

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});
router.afterEach(() => {
    NProgress.done(true);
});

export default router;
