import type { FunctionalComponent } from "preact";

// window/app definition
interface Window {
	title: string;
	component: FunctionalComponent<WindowProps>;
	associatedPath?: string;
	id: string;
	type: string;
	icon: ImageMetadata;
	openByDefault?: boolean;
	meta?: {
		title: string;
		description: string;
		path: string;
	};
}

type WindowType = Window;

// props given to a window
interface WindowProps {
	title?: string;
	id: string;
	order: number;
	onClose: () => void;
	onTouch: () => void;
	openWindow: (window: WindowType) => void;
}

export type { WindowProps, WindowType };
