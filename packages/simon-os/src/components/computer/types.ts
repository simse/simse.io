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
}

interface BlogPostWindowType extends Window {
	type: "blogPost";
	postSlug: string;
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
}

export type { WindowProps, WindowType, InitialStateAction };
