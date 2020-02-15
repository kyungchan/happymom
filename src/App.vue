<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <router-link color="white" :style="'text-decoration:none;margin-right: 15px;'" to="/">
        <v-toolbar-title class="white--text text-uppercase font-weight-light">
          <span>Happy</span>
          <span class="font-weight-medium">mom</span>
        </v-toolbar-title>
      </router-link>

      <v-divider inset vertical class="hidden-sm-and-down"></v-divider>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-html="$t('menu1')" to="/survey"></v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-html="$t('menu3')" to="/info"></v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-html="$t('menu4')" to="/music"></v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-html="$t('menu5')" to="/image"></v-btn>
      </v-toolbar-items>
      <!-- <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-toolbar-items>
            <v-btn v-on="on" text class="hidden-sm-and-down">
              {{ $t("menu2") }}
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </v-toolbar-items>
        </template>

        <v-list>
          <v-list-item to="/info">
            <v-list-item-title v-html="$t('menu3')"></v-list-item-title>
          </v-list-item>
          <v-list-item to="/music">
            <v-list-item-title v-html="$t('menu4')"></v-list-item-title>
          </v-list-item>
          <v-list-item to="/image">
            <v-list-item-title v-html="$t('menu5')"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>-->
      <v-spacer></v-spacer>

      <router-link to="/signin" v-if="$store.state.token == null">
        <v-btn text>
          <v-icon class="hidden-sm-and-down">mdi-login</v-icon>
          <span v-html="$t('auth-signin')"></span>
        </v-btn>
      </router-link>
      <v-menu v-if="$store.state.token != null" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text>
            <span class="hidden-md-and-up">My</span>
            <v-icon class="hidden-sm-and-down">mdi-account-circle</v-icon>
            <span class="hidden-sm-and-down">{{ username }}</span>
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/admin" v-if="$store.state.role == 'admin'">
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
          <v-list-item to="/my">
            <v-list-item-title v-html="$t('auth-my')"></v-list-item-title>
          </v-list-item>
          <v-list-item @click="signOut">
            <v-list-item-title v-html="$t('auth-signout')"></v-list-item-title>
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
            <v-list-item-title>
              {{
              locale.title
              }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title text-uppercase font-weight-light">
              <span>Happy</span>
              <span class="font-weight-medium">mom</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item v-if="$store.state.token != null" to="/my">
          <v-list-item-avatar>
            <v-icon large>mdi-account-circle</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ username }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col align="center">
              <v-btn
                v-if="$store.state.token != null"
                text
                v-html="$t('auth-signout')"
                @click="signOut"
              >로그아웃</v-btn>
              <v-btn
                v-if="$store.state.token == null"
                text
                v-html="$t('auth-signin')"
                to="/signin"
              >로그인</v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </template>

      <v-divider />
      <v-list dense>
        <v-list-item link to="/survey">
          <v-list-item-icon>
            <v-icon>mdi-format-list-checks</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-html="$t('menu1')"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/info">
          <v-list-item-icon>
            <v-icon>mdi-bookshelf</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-html="$t('menu3')"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/music">
          <v-list-item-icon>
            <v-icon>mdi-playlist-music</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-html="$t('menu4')"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/image">
          <v-list-item-icon>
            <v-icon>mdi-flower-poppy</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-html="$t('menu5')"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- 
        <v-list-group prepend-icon="mdi-information-outline" no-action>
          <template v-slot:activator>
            <v-list-item-title v-html="$t('menu2')"></v-list-item-title>
          </template>
          <v-list-item to="/info">
            <v-list-item-content>
              <v-list-item-title v-html="$t('menu3')"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/music">
            <v-list-item-content>
              <v-list-item-title v-html="$t('menu4')"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/image">
            <v-list-item-content>
              <v-list-item-title v-html="$t('menu5')"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>-->
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
import store from "./store";
import router from "./router";

var signOut = () => {
  return new Promise((resolve, reject) => {
    router.push({ name: "home" });
    resolve();
  });
};

export default Vue.extend({
  name: "App",
  components: {},
  methods: {
    signOut() {
      signOut().then(r => {
        store.commit("signOut");
        Vue.$cookies.remove("token");
      });
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
<style scoped>
.drawer-user-info {
  padding: 10px;
}
</style>