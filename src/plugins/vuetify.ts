import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "deep-purple accent-4"
            },
            dark: {
                primary: "deep-purple accent-4"
            }
        }
    }
});
