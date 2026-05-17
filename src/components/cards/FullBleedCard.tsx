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
  titleLayout,
  description,
  picture,
  placeholder,
  contrastTop,
  contrastBottom,
}: FullBleedCardProps) => {
  const isTitleSubtle = titleLayout === "subtle";

  return (
    <Card.Base href={href} size={size}>
      <Card.BackgroundImage picture={picture} placeholder={placeholder} />
      <Card.Header
        tag={tag}
        subtleTitle={isTitleSubtle ? title : undefined}
        tone={toneFor(contrastTop)}
      />
      {title ? (
        <Card.Body
          title={!isTitleSubtle ? title : undefined}
          description={description}
          tone={toneFor(contrastBottom)}
          pinToBottom
        />
      ) : null}
    </Card.Base>
  );
};
