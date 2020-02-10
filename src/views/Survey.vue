<template>
    <v-container>
        <v-row justify="center">
            <v-col :cols="12" :xs="12" :sm="12" :md="10" :lg="10" :xl="8">
                <survey :survey="survey"></survey>
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
import "bootstrap/dist/css/bootstrap.css";
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
        }
    },
    mounted() {
        model.onComplete.add(result => this.complete(result));
    }
};
</script>

<style>
.container {
    max-width: initial;
}
</style>
