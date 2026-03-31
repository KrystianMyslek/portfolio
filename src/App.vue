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
				Od 2018 r. pracuję na stanowisku Full Stack Developer, wykorzystując na co dzień technologie
				takie jak mi.in.: PHP (Symfony, Phalcon, Laravel), JavaScript (JQuery), React, mySQL oraz
				PosgreSQL. Moje doświadczenie zawodowe obejmuje projektowanie i rozwój aplikacji webowych od
				warstwy serwerowej, po interfejs użytkownika, optymalizację wydajności aplikacji oraz
				refaktoryzację istniejącego kodu czy tworzenie i integrację REST API z zewnętrznymi systemami.
				Cenię sobie pracę zespołową i dobry kontakt z klientem, to pozwala mi skutecznie dbać o
				wydajność i bezpieczeństwo tworzonych rozwiązań, jednak potrafię także przejąć pełną
				odpowiedzialność za powierzone mi zadania, pracując samodzielnie. Jestem nastawiony na ciągły
				rozwój. Regularnie śledzę nowe trendy technologiczne, starając się wdrażać je w praktyce.
				Chciałbym zdobywać dalsze doświadczenia zawodowe, nowe umiejętności i kompetencje.
			</section>

			<section id="projects" ref="projects">
				<Projects />
			</section>

			<section id="experience" ref="experience">
				W pracy, tak na co dzień miałem do czynienia z dwoma kluczowymi projektami. W obu przypadkach
				mowa o systemach ERP. Jeden dość prosty, ale zawierał wszystkie niezbędne elementy do pracy w
				drukarni. System był stworzony w PHP na framework Symfony, lecz dość znacznie zmodyfikowany
				przez nasz zespół by lepiej pasował do naszych potrzeb. Drugi system, z którym miałem do
				czynienia, był znacznie bardziej rozwinięty. Główny system wspomagał pracę w salonach usług
				telekomunikacyjnych jak np. Play czy Orange, lecz na rynku niemieckim. System ten wspierał
				prace zarówno z klientem docelowym przy podpisywaniu umów, sprzedaży ubezpieczeń jak i pomagał
				kierownikom przy zarządzaniu planem pracy, wynagrodzeniami i wszelakimi aspektami
				administracyjnymi. Ten system podobnie jak uprzedni został stworzony w PHP na Symfony i tutaj
				także został on mocno zmodyfikowany. Przy tym projekcie to nie koniec, bo do tego systemu
				stworzyliśmy system pomocniczy. Posiadał on wiele funkcji, ale głównym jego zadaniem była
				kontrola instancji głównego systemu. Został on stworzony także w PHP, lecz na framework
				Phalcon. Tutaj potrzebowaliśmy czegoś lekkiego i szybkiego. Aby w życiu nie było za lekko,
				niektórzy klienci zażyczyli sobie by ich instancja była odcięta od internetu, jednak chcąc by
				system do zarządzania wciąż działał stworzyliśmy oprogramowanie do komunikacji między nimi.
				Nie wchodząc już w szczegóły techniczne to oprogramowanie zostało stworzone w Node.js w języku
				TypeScript. Powstała nawet aplikacja mobilna dla pracowników, głównie służyła do autoryzowania
				logowania w systemie, ale miała także dodatkowe funkcje jak przeglądanie planu pracy.
				Aplikacja powstawała przy użyciu oprogramowania Cordova. Przez to że nasz zespół był na prawdę
				mały (5 osób) to nie było mowy o wybieraniu projektów pod siebie, dzięki temu miałem kontakt z
				wieloma róznymi technologiami co pozwala utrzymać otwarty umysł :)
			</section>

			<section id="contact" ref="contact">
				<Contact />
			</section>

			<Footer />
		</div>
	</div>
</template>
