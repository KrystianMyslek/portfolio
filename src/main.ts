import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import "./style.css";
import App from "./App.vue";

import type { langs } from "./types.ts";
import plPL from "./locales/pl-PL.json";
import enUS from "./locales/en-US.json";

type MessageSchema = typeof plPL;

const userLang = localStorage.getItem("user-lang") as langs;
const initialLocale = userLang || navigator.language || "pl-PL";

const i18n = createI18n<[MessageSchema], langs>({
	locale: initialLocale,
	fallbackLocale: "en-US",
	messages: {
		"pl-PL": plPL,
		"en-US": enUS,
	},
});

const app = createApp(App);

app.use(i18n);
app.mount("#app");
