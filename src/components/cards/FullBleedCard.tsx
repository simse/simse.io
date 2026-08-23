import { Card } from "./primitives/Card";
import type { PictureData } from "./primitives/picture";
import type { CommonProps } from "./primitives/types";

type Contrast = "light" | "dark";

const toneFor = (contrast: Contrast | undefined): "image-light" | "image-dark" =>
  contrast === "dark" ? "image-dark" : "image-light";

interface AnimatedConfig {
  src: string;
  autoplay: boolean;
  resetOnLeave: boolean;
  loop: boolean;
}

interface FullBleedCardProps extends CommonProps {
  description?: string;
  picture?: PictureData;
  placeholder?: string;
  contrastTop?: Contrast;
  contrastBottom?: Contrast;
  animated?: AnimatedConfig;
}

export const FullBleedCard = ({
  tag,
  href,
  size = 1,
  title,
  titleConfig,
  description,
  picture,
  placeholder,
  contrastTop,
  contrastBottom,
  animated,
}: FullBleedCardProps) => {
  return (
    <Card.Base href={href} size={size} title={title} titleConfig={titleConfig}>
      {animated ? (
        <Card.AnimatedBackground {...animated} poster={picture?.src} />
      ) : picture ? (
        <Card.BackgroundImage picture={picture} placeholder={placeholder} />
      ) : null}
      <Card.Header tag={tag} tone={toneFor(contrastTop)} />
      <Card.Body description={description} tone={toneFor(contrastBottom)} />
    </Card.Base>
  );
};
