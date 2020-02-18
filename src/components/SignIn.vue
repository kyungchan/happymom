<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-form id="signin" ref="signin">
            <v-alert
              type="success"
              v-if="$route.params.signup === true"
              dense
            >{{ this.$t("auth-ok-signup") }}</v-alert>
            <v-alert type="error" v-if="invaild" dense>
              {{
              this.$t("auth-err-invail")
              }}
            </v-alert>

            <v-alert
              type="warining"
              v-if="$route.params.need === true"
              dense
            >{{ this.$t("auth-err-need") }}</v-alert>

            <div class="display-1 text-center" v-html="$t('auth-signin')"></div>
            <v-text-field :label="$t('auth-id')" v-model="user.id" counter required></v-text-field>
            <v-text-field
              :label="$t('auth-pass')"
              v-model="user.password"
              :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              @click:append="visible = !visible"
              counter
              required
              @keyup.enter.native="onEnter"
            ></v-text-field>
          </v-form>
          <v-card-actions>
            <v-btn @click="submit" class="btn-lg" color="primary" v-html="$t('auth-signin')" dark></v-btn>
            <br />
          </v-card-actions>

          <router-link id="signup" to="/signup" v-html="$t('auth-signup')"></router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "axios";
var env = "";
if (process.env.NODE_ENV == "development") env = "api/";

export default {
  data() {
    return {
      visible: false,
      invaild: false,
      user: {
        id: "",
        password: ""
      },
      idRules: [
        v => !!v || this.$t("auth-err-required"),
        v => v.length >= 6 || this.$t("auth-err-id-least")
      ],
      passRules: [
        v => !!v || this.$t("auth-err-required"),
        v => v.length >= 8 || this.$t("auth-err-pass-least")
      ]
    };
  },
  methods: {
    onEnter() {
      this.submit();
    },
    submit() {
      if (this.$refs.signin.validate()) {
        this.signin();
      }
    },
    signin() {
      Axios.post(env + "auth/signin", this.user)
        .then(res => {
          if (res.status == 200) {
            this.$store.commit("signIn", res.data.token);

            this.$store.commit("loginCheck");
            this.$router.push({
              name: "home"
            });
          }
        })
        .catch(err => {
          this.invaild = true;
          this.user.id = "";
          this.user.password = "";
        });
    }
  }
};
</script>

<style scoped>
#signin {
  padding: 20px;
}
#signup {
  display: block;
  color: #474747;
  text-align: center;
  padding: 10px 0;
  font-size: 10pt;
}
.btn-lg {
  width: 100%;
}
</style>
