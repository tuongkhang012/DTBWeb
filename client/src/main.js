import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/route";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");