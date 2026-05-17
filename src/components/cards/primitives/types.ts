type CardSize = 1 | 2;

const titleLayout = ["prominent", "subtle"] as const;
type TitleLayout = (typeof titleLayout)[number];

// props that all card types accept and respect
interface CommonProps {
  size?: CardSize;
  href?: string;
  tag?: string;
  title?: string;
  titleLayout?: TitleLayout;
}

export { titleLayout };

export type { CommonProps, CardSize, TitleLayout };
