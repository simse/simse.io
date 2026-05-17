import { Card } from "./primitives/Card";
import type { PictureData } from "./primitives/picture";
import type { CommonProps } from "./primitives/types";

interface ScreenshotCardProps extends CommonProps {
  description?: string;
  picture: PictureData;
  placeholder?: string;
}

export const ScreenshotCard = ({
  tag,
  href,
  title,
  titleConfig,
  description,
  picture,
  placeholder,
}: ScreenshotCardProps) => {
  return (
    <Card.Base href={href} title={title} titleConfig={titleConfig}>
      <Card.Header tag={tag} />
      <Card.Body description={description} />
      <Card.Picture
        picture={picture}
        placeholder={placeholder}
        class="-mt-8 translate-y-12 scale-110 -rotate-3 transition-transform group-hover:scale-115"
      />
    </Card.Base>
  );
};
