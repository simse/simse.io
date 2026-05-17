import { Card } from "./primitives/Card";
import type { PictureData } from "./primitives/picture";
import type { CommonProps } from "./primitives/types";

type Contrast = "light" | "dark";

const toneFor = (contrast: Contrast | undefined): "image-light" | "image-dark" =>
  contrast === "dark" ? "image-dark" : "image-light";

interface FullBleedCardProps extends CommonProps {
  description?: string;
  picture: PictureData;
  placeholder?: string;
  contrastTop?: Contrast;
  contrastBottom?: Contrast;
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
}: FullBleedCardProps) => {
  return (
    <Card.Base href={href} size={size} title={title} titleConfig={titleConfig}>
      <Card.BackgroundImage picture={picture} placeholder={placeholder} />
      <Card.Header tag={tag} tone={toneFor(contrastTop)} />
      <Card.Body description={description} tone={toneFor(contrastBottom)} />
    </Card.Base>
  );
};
