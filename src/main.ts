import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

import { createBootstrap } from "bootstrap-vue-next/plugins/createBootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/main.css";

const app = createApp(App).use(createBootstrap()).use(router);

// Wait for the first navigation (which may redirect to a language prefix)
// so the page is not rendered before the correct language is known.
router.isReady().then(() => app.mount("#app"));
