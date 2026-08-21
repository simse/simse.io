import type { FunctionalComponent } from "preact";

// window/app definition
interface Window {
  title: string;
  component: FunctionalComponent<WindowProps>;
  id: string;
  type: string;
  icon: ImageMetadata;
  openByDefault?: boolean;
  showOnDesktop?: boolean;
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
