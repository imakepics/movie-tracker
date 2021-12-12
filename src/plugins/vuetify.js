import "@/styles/style.scss";
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        options: {
            customProperties: true,
        },
        themes: {
            dark: {
                primary: "#42b983",
                secondary: "#ffffff",
                background: "#242d3c",
            },
        },
    },
});