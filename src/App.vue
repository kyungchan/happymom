<template>
    <v-app>
        <v-app-bar color="primary" dark app>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
                class="hidden-md-and-up"
            ></v-app-bar-nav-icon>
            <router-link
                color="white"
                :style="'text-decoration:none;margin-right: 15px;'"
                to="/"
            >
                <v-toolbar-title
                    class="white--text text-uppercase font-weight-light"
                >
                    <span>Happy</span>
                    <span class="font-weight-medium">mom</span>
                </v-toolbar-title>
            </router-link>

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn text v-html="$t('menu1')" to="/survey"></v-btn>
            </v-toolbar-items>
            <v-menu open-on-hover offset-y>
                <template v-slot:activator="{ on }">
                    <v-toolbar-items>
                        <v-btn v-on="on" text class="hidden-sm-and-down">
                            {{ $t("menu2") }}
                            <v-icon>mdi-menu-down</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-title
                            v-html="$t('menu3')"
                        ></v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title
                            v-html="$t('menu4')"
                        ></v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title
                            v-html="$t('menu5')"
                        ></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-spacer></v-spacer>

            <router-link to="/signin" v-if="$store.state.token == null">
                <v-btn text>
                    <v-icon>mdi-login</v-icon>
                    <span
                        class="hidden-sm-and-down"
                        v-html="$t('auth-signin')"
                    ></span>
                </v-btn>
            </router-link>
            <v-menu v-if="$store.state.token != null" offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" text>
                        <v-icon>mdi-account-circle</v-icon>
                        <span class="hidden-sm-and-down">{{ username }}</span>
                        <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item to="/my">
                        <v-list-item-title>내 정보</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="signOut">
                        <v-list-item-title>로그아웃</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" text>
                        <v-icon>mdi-translate</v-icon>
                        <span class="hidden-sm-and-down">{{ locale }}</span>
                        <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        v-for="(locale, key) in locales"
                        :key="key"
                        @click="
                            $i18n.locale = locale.locale;
                            $store.commit('changeLocale', locale.title);
                        "
                    >
                        <v-list-item-title>{{
                            locale.title
                        }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app temporary>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title
                        class="title text-uppercase font-weight-light"
                    >
                        <span>Happy</span>
                        <span class="font-weight-medium">mom</span>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider id="drawer-divider"></v-divider>

            <v-list dense>
                <v-list-item link to="/survey">
                    <v-list-item-icon>
                        <v-icon>mdi-format-list-checks</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            v-html="$t('menu1')"
                        ></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group prepend-icon="mdi-information-outline" no-action>
                    <template v-slot:activator>
                        <v-list-item-title
                            v-html="$t('menu2')"
                        ></v-list-item-title>
                    </template>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                v-html="$t('menu3')"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                v-html="$t('menu4')"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                v-html="$t('menu5')"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-content>
    </v-app>
</template>
<style scoped>
#drawer-divider {
    margin: 0;
}
a {
    text-decoration: none;
}
.fade-before-enter {
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import i18n from "./i18n";

export default Vue.extend({
    name: "App",
    components: {},
    methods: {
        signOut() {
            this.$store.commit("signOut");
            Vue.$cookies.remove("token");
            this.$router.push("/");
        }
    },
    computed: {
        username() {
            return this.$store.state.username;
        },
        locale() {
            return this.$store.state.locale;
        }
    },
    data: () => ({
        locales: [
            { title: "한국어", locale: "ko" },
            { title: "tiếng Việt", locale: "vn" }
        ],
        myMenu: [
            { title: "내 정보", to: "/my" },
            { title: "로그아웃", to: "/signout" }
        ],
        drawer: false
    })
});
</script>
