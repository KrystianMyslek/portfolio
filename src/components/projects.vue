<script setup lang="ts">
import type { project } from "../types";
import Project from "./project.vue";

const projects: project[] = [
	{
		name: "IT Goodness Rank",
		description: "projects.itgoodnessrank.description",
		link: "https://itgoodnessrank.krystianmyslek.com/goodness/ranking",
		github: "https://github.com/KrystianMyslek/itGoodnessRank",
		icon: "symfony",
		popover: {
			title: "Admin access",
			content: `
				<p>Admin access to explore :)</p>
				<p>login: admin pass: Admin123</p>
			`,
		},
	},
	{
		name: "Quick Quiz",
		description: "projects.quickquiz.description",
		link: "https://quickquiz.krystianmyslek.com/",
		github: "https://github.com/KrystianMyslek/quickquiz",
		icon: "laravel",
	},
	{
		name: "Slide Puzzle",
		description: "projects.slidepuzzle.description",
		link: "https://slidepuzzle.krystianmyslek.com/",
		github: "https://github.com/KrystianMyslek/slidePuzzle",
		icon: "react",
	},
	{
		name: "PapperSoccer | IN PROGRESS",
		description: "projects.papersoccer.description",
		link: "https://papersoccer.krystianmyslek.com/",
		github: "https://github.com/KrystianMyslek/paperSoccer_client",
		github_2: "https://github.com/KrystianMyslek/paperSoccer_server",
		icon: "angular",
	},
];
</script>

<template>
	<ul v-for="project in projects" :key="project.name">
		<Project :project="project" />
	</ul>
</template>
