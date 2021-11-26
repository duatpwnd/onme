import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import { createApp } from "vue";
import router from "@/router";
import App from "@/App.vue";
const app = createApp(App);
const sentry = () => {
  Sentry.init({
    environment: process.env.NODE_ENV,
    app,
    dsn: "https://7d24e9194bf34ccb9741a04d8d8db6bc@o1036024.ingest.sentry.io/6003484",
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost", "my-site-url.com", /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
};
export default sentry;
