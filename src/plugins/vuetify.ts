import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#6200EA",
                secondary: "#9C27B0",
                accent: "#E91E63"
            },
            dark: {
                primary: "#6200EA",
                secondary: "#9C27B0",
                accent: "#E91E63"
            }
        }
    }
});
