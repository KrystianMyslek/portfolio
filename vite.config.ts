import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import usePHP from "vite-plugin-php";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		tailwindcss(),
		usePHP({
			entry: ["server/message.php"],
		}),
	],
	server: {
		open: "/server/message.php",
	},
});
