import type { TitleConfig } from "./titleConfig";

type CardSize = 1 | 2;

// props that all card types accept and respect
interface CommonProps {
  size?: CardSize;
  href?: string;
  tag?: string;
  title?: string;
  titleConfig?: TitleConfig;
}

export type { CommonProps, CardSize };
