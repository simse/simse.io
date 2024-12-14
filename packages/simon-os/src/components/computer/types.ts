import type { CollectionEntry } from "astro:content";
import type { FunctionalComponent } from "preact";

interface Window {
	title: string;
	component: FunctionalComponent<WindowProps>;
	associatedPath?: string;
	id: string;
	meta?: {
		title: string;
		description: string;
		path: string;
	};
}

interface RadioWindowType extends Window {
	type: "radio";
}

interface BiograhyWindowType extends Window {
	type: "biography";
}

interface BlogListWindowType extends Window {
	type: "blogList";
	posts: CollectionEntry<"blog">[];
}

interface BlogPostWindowType extends Window {
	type: "blogPost";
	postSlug: string;
	prefetchedPost?: {
		html: string;
		frontmatter: CollectionEntry<"blog">["data"];
	};
}

type WindowType =
	| BiograhyWindowType
	| BlogListWindowType
	| RadioWindowType
	| BlogPostWindowType;

interface WindowProps {
	title?: string;
	id: string;
	order: number;
	onClose: () => void;
	onTouch: () => void;
	openWindow: (window: WindowType) => void;
}

interface InitialStateAction {
	type: "openBlogPost";
	postSlug: string;
	prefetchedPost: {
		html: string;
		frontmatter: CollectionEntry<"blog">["data"];
	};
}

export type { WindowProps, WindowType, InitialStateAction };
