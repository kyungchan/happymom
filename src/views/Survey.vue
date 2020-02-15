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
                <span class="subttle">중재 전, 중재 후 설문조사를 선택해주세요.</span>
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
        <v-textarea
          id="surveyResult"
          label="Result JSON"
          v-model="surveyResult"
          v-if="surveyCompleted"
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as SurveyVue from "survey-vue";
import * as SurveyPDF from "survey-pdf";
import * as SurveyKo from "survey-knockout";
import "@/assets/bootstrap.css";
import surveyJSON from "@/assets/surveyKo.json";
var Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";

import * as widgets from "surveyjs-widgets";

var model = new SurveyVue.Model(surveyJSON);
export default {
  name: "app",
  components: {
    Survey
  },
  data() {
    var savePDF = function() {
      var surveyPDF = new SurveyPDF.SurveyPDF(surveyJSON);
      surveyPDF.data = model.data;
      surveyPDF.save();
    };
    return {
      radios: "before",
      nowPage: 1,
      surveyCompleted: false,
      surveyResult: "",
      survey: model,
      savePDF: savePDF
    };
  },
  methods: {
    complete(result) {
      this.surveyCompleted = true;
      this.surveyResult = JSON.stringify(result.data, null, 4);
    },
    surveyNext() {
      this.nowPage = this.nowPage + 1;
    }
  },
  mounted() {
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
