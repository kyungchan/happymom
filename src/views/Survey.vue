<template>
    <div class="Survey">
        <survey :survey="survey"></survey>
        <!-- If you want to hide Survey PDF, comment the lines below 
        <h2>Survey PDF:</h2>
        <button v-on:click="savePDF">Save PDF</button>-->
    </div>
</template>

<script>
import * as SurveyVue from "survey-vue";
import * as SurveyPDF from "survey-pdf";
import * as SurveyKo from "survey-knockout";
import "bootstrap/dist/css/bootstrap.css";
import surveyJSON from "@/assets/surveyKo.json";
var Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";

import * as widgets from "surveyjs-widgets";

export default {
    name: "app",
    components: {
        Survey
    },
    data() {
        var model = new SurveyVue.Model(surveyJSON);
        var savePDF = function() {
            var surveyPDF = new SurveyPDF.SurveyPDF(surveyJSON);
            surveyPDF.data = model.data;
            surveyPDF.save();
        };
        return {
            survey: model,
            savePDF: savePDF
        };
    }
};
</script>
