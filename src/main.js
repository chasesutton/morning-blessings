// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import vuetify from "./plugins/vuetify"; // Import Vuetify plugin
import "./plugins/firebase"; // Import Firebase plugin to initialize it

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
