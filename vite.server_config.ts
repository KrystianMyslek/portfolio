import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import usePHP from "vite-plugin-php";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
	build: {
		emptyOutDir: false,
	},
	plugins: [
		vue(),
		usePHP({
			entry: ["server/message.php"],
		}),
		viteStaticCopy({
			targets: [
				{
					src: "server/PHPMailer",
					dest: "",
				},
			],
		}),
	],
	server: {
		open: "/server/message.php",
	},
});
