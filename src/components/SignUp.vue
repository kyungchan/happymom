<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <transition name="fade">
          <v-card v-if="agreePage">
            <v-card-text>
              <div class="display-1 text-center" style="color:black;" v-html="$t('auth-signup')"></div>
              <br />
              <div class="agree">연구 설명서</div>
              <v-textarea
                class="body-2"
                readonly
                filled
                value="안녕하십니까?
저는 조선대학교 의과대학 간호학과에 재직중인 문소현입니다.
본 연구는 결혼이주 임신여성의 스트레스 대응 증진 프로그램의 효과를 검증하고자 수행되고 있습니다.
본 프로그램과 설문지는 신체적, 정신적으로 위험가능성은 없으며, 동의하지 않거나 철회 할 수 있고 응답해주는 설문 내용은 무기명으로 비밀보장 될 것이며, 설문지 소요 시간은 20~30분 정도 예상합니다.
자료는 연구 기간 동안 관계자 외에 열람이 금지되며, 열람의 권한은 본 연구자와 공동교수 1인, 필요시 자문위원으로 제한하여 사용 후 폐기처분 됩니다. 본 연구의 소중한 자료가 될 것이며, 정확한 자료가 되도록 평소의 생각을 솔직히 답변해 주시면 감사 하겠습니다.
바쁘신 와중에도 연구에 협조해주셔서 감사드립니다. 감사의 선물로 소정의 상품을 드립니다.
일 시: 2020년 2 월 일
연 구 자: 조선대학교 의과대학 간호학과
연 락 처: H.P 010-8622-4509, E-mail: shmoon@chosun.ac.kr"
              ></v-textarea>
              <div class="agree">연구 참여 동의서</div>
              <v-textarea
                class="body-2"
                readonly
                filled
                value="⦁본인은 본 연구의 목적을 이해하였습니다.
⦁본인은 연구 참여 기간 동안 언제라도 중도에 연구 참여를 거부하거나 중단할 수 있습니다.
⦁본인은 자유로운 의사에 따라 본 연구의 자료수집 참여에 동의합니다.
⦁ 이 연구는 조선대학교 생명윤리위원회가 승인하였으며 이 연구의 참여자로서 귀하의 권리에 대해 질문이 있으시면 조선대학교 생명윤리위원회(전화 062-230-6690, Email: mailto:irb@chosun.ac.kr)에게 문의하실 수 있습니다(익명으로도 가능합니다)."
              ></v-textarea>
              <v-btn @click="agree" class="btn-lg" color="primary" v-html="$t('auth-agree')" dark></v-btn>
            </v-card-text>
          </v-card>
        </transition>
        <transition name="fade">
          <v-card v-if="!agreePage">
            <v-form id="signin" ref="signup" v-model="valid">
              <div class="display-1 text-center" v-html="$t('auth-signup')"></div>
              <v-text-field
                :label="$t('auth-id')"
                v-model="user.id"
                :rules="idRules"
                @keydown="idChange"
                counter
                required
              ></v-text-field>
              <v-text-field
                :label="$t('auth-pass')"
                v-model="user.pass"
                :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                :type="visible ? 'text' : 'password'"
                @click:append="visible = !visible"
                :rules="passRules"
                counter
                required
              ></v-text-field>

              <v-text-field
                :label="$t('auth-pass-conf')"
                :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                :type="visible ? 'text' : 'password'"
                @click:append="visible = !visible"
                :rules="passConfRules"
                counter
                required
              ></v-text-field>
              <v-text-field
                :label="$t('auth-name')"
                v-model="user.name"
                :rules="nameRules"
                counter
                required
              ></v-text-field>
              <v-text-field
                :label="$t('auth-email')"
                v-model="user.email"
                :rules="emailRules"
                required
              ></v-text-field>

              <v-btn @click="submit" class="btn-lg" color="primary" v-html="$t('auth-signup')" dark></v-btn>
            </v-form>
          </v-card>
        </transition>
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
      valid: true,
      idExist: false,
      visible: false,
      agreePage: true,
      user: {
        id: "",
        pass: "",
        name: "",
        email: ""
      },
      idRules: [
        v => !!v || this.$t("auth-err-required"),
        v => v.length >= 6 || this.$t("auth-err-id-least"),
        v => this.idExist != true || this.$t("auth-err-id-exist")
      ],
      passRules: [
        v => !!v || this.$t("auth-err-required"),
        v => v.length >= 8 || this.$t("auth-err-pass-least")
      ],
      passConfRules: [
        v => !!v || this.$t("auth-err-required"),
        v => v == this.user.pass || this.$t("auth-err-pass-conf")
      ],
      nameRules: [
        v => !!v || this.$t("auth-err-required"),
        v => (v && v.length <= 10) || this.$t("auth-err-name-conf")
      ],
      emailRules: [
        v => !!v || this.$t("auth-err-required"),
        v => /.+@.+\..+/.test(v) || this.$t("auth-err-email-conf")
      ]
    };
  },
  methods: {
    submit() {
      if (this.$refs.signup.validate()) {
        this.signup();
      }
    },
    agree() {
      this.agreePage = false;
    },
    idChange() {
      if (this.idExist) {
        this.idExist = false;
      }
    },
    signup() {
      Axios.post(env + "users", this.user)
        .then(res => {
          if (res.status === 201) {
            this.$router.push({
              name: "signin",
              params: { signup: true }
            });
          }
        })
        .catch(err => {
          if (err.response.status === 409) {
            this.idExist = true;
            this.$refs.signup.validate();
          }
        });
    }
  }
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.3s;
  transition-delay: 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity 0.3s;
}
.fade-enter-to {
  opacity: 1;
}

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
