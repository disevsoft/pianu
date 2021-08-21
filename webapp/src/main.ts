import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from './plugins/element'
import "@/global/styles.css";

const app = createApp(App);
app.use(store);
app.use(router);
//app.use(ElementPlus);
installElementPlus(app)
app.mount("#app");
