<script setup lang="ts">
import { ref } from "vue";
import Contact from "./components/contact.vue";
import Footer from "./components/footer.vue";
import Nav from "./components/nav.vue";
import Projects from "./components/projects.vue";

const page = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();

const about = ref<HTMLDivElement>();
const projects = ref<HTMLDivElement>();
const experience = ref<HTMLDivElement>();
const contact = ref<HTMLDivElement>();

const setCursorPosition = (x: number, y: number) => {
	if (page.value != undefined) {
		page.value.style.setProperty("--cursor_x_position", x + "px");
		page.value.style.setProperty("--cursor_y_position", y + "px");
	}
};

const handleMouse = (event: MouseEvent) => {
	const { clientY, clientX } = event;
	setCursorPosition(clientX, clientY);
};

const menuClick = (target: string) => {
	document
		.getElementById("menu")
		?.querySelectorAll("li")
		.forEach((el) => el.classList.remove("active"));
	document.getElementById(target)?.classList.add("active");
};

let prev_scroll_pos = 0;
const handleScroll = () => {
	if (content.value == undefined) return;

	let scroll_pos = content.value.scrollTop || 0;
	let down = prev_scroll_pos < scroll_pos ? true : false;
	prev_scroll_pos = scroll_pos;

	let height = {
		about: about.value?.offsetHeight || 0,
		projects: projects.value?.offsetHeight || 0,
		experience: experience.value?.offsetHeight || 0,
		contact: contact.value?.offsetHeight || 0,
	};

	if (down) {
		switch (true) {
			case scroll_pos >= height.about + height.projects + height.experience - 200:
				menuClick("menu_contact");
				break;
			case scroll_pos >= height.about + height.projects:
				menuClick("menu_experience");
				break;
			case scroll_pos >= height.about - 100:
				menuClick("menu_projects");
				break;
			default:
				break;
		}
	} else {
		switch (true) {
			case scroll_pos <= height.about - 100:
				menuClick("menu_about");
				break;
			case scroll_pos <= height.about + height.projects - 200:
				menuClick("menu_projects");
				break;
			case scroll_pos <= height.about + height.projects + height.experience:
				menuClick("menu_experience");
				break;
			default:
				break;
		}
	}
};

setCursorPosition(100, 300);
</script>

<template>
	<div id="page" ref="page" @mousemove="handleMouse">
		<Nav />

		<div id="content" ref="content" @scroll="handleScroll">
			<section id="about" ref="about">
				{{ $t("about_me") }}
			</section>

			<section id="projects" ref="projects">
				<Projects />
			</section>

			<section id="experience" ref="experience">
				{{ $t("experience") }}
			</section>

			<section id="contact" ref="contact">
				<Contact />
			</section>

			<Footer />
		</div>
	</div>
</template>
