export const LANGUAGES = ["pl-PL", "en-US"] as const;

export type langs = (typeof LANGUAGES)[number];

export type icon = "symfony" | "laravel" | "react" | "angular";

export type project = {
	name: string;
	description: string;
	link: string;
	github: string;
	github_2?: string;
	icon: icon;
	popover?: {
		title: string;
		content: string;
	};
};
