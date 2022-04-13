import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import AmplifyVue from "@aws-amplify/ui-vue";

import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

createApp(App).use(store).use(router).use(AmplifyVue).mount("#app");
