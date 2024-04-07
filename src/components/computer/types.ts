import type { CollectionEntry } from "astro:content";
import type { FunctionalComponent } from "preact";

interface Window {
  title: string;
  component: FunctionalComponent<WindowProps>;
  id: string;
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
}

type WindowType =
  | BiograhyWindowType
  | BlogListWindowType
  | RadioWindowType
  | BlogPostWindowType;

interface WindowProps {
  title?: string;
  zIndex: number;
  onClose: () => void;
  onTouch: () => void;
  openWindow: (window: WindowType) => void;
}

export type { WindowProps, WindowType };
