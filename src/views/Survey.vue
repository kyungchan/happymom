<template>
  <v-container>
    <v-row justify="center">
      <v-col :cols="12" :xs="12" :sm="12" :md="10" :lg="10" :xl="8">
        <transition name="fade">
          <div v-if="nowPage == 1">
            <v-card>
              <v-card-title>
                <span class="title">스트레스 측정 설문을 시작합니다.</span>
              </v-card-title>
              <v-card-subtitle>
                <span class="subttle">
                  중재 전, 중재 후 설문조사를
                  선택해주세요.
                </span>
              </v-card-subtitle>
              <v-card-text>
                <v-radio-group v-model="radios" :mandatory="false">
                  <v-radio label="중재 전" value="before"></v-radio>
                  <v-radio label="중재 후" value="after"></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="surveyNext()">설문 시작</v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <survey v-else :survey="survey"></survey>
        </transition>
        <div v-if="surveyCompleted">
          <v-btn color="primary" to="/">{{$t('survey-tohome')}}</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as SurveyVue from "survey-vue";
import "@/assets/bootstrap.css";
import surveyJSON from "@/assets/surveyKo.json";
import Axios from "axios";
import store from "../store";

var Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";

var env = "";
if (process.env.NODE_ENV == "development") env = "api/";
var model;
export default {
  name: "app",

  components: {
    Survey
  },
  data() {
    model = new SurveyVue.Model(surveyJSON);
    var savePDF = function() {
      var surveyPDF = new SurveyPDF.SurveyPDF(surveyJSON);
      surveyPDF.data = model.data;
      surveyPDF.save();
    };
    return {
      radios: "before",
      nowPage: 2,
      surveyCompleted: false,
      survey: model,
      savePDF: savePDF
    };
  },
  computed: {
    localeCode() {
      return this.$store.state.localeCode;
    }
  },
  watch: {
    localeCode(localeCode) {
      this.changeLocale(localeCode);
    }
  },
  methods: {
    changeLocale(locale) {
      this.survey.locale = locale;
      this.survey.render();
    },
    complete(result) {
      this.surveyCompleted = true;
      Axios.post(env + "survey/" + store.state.userid, {
        json: JSON.stringify(result.data, null, 0)
      })
        .then(res => {})
        .catch(err => {});
    },
    surveyNext() {
      this.nowPage = this.nowPage + 1;
    }
  },
  mounted() {
    this.changeLocale(this.localeCode);
    model.onComplete.add(result => this.complete(result));
  }
};
</script>

<style>
.sv_main.sv_main .table > tbody > tr > td:nth-child(1) {
  background: #efefef;
  font-weight: 700;
}
</style>

<style scoped>
.fade-enter-active {
  transition: opacity 0.3s;
  transition-delay: 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity 0.3s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
