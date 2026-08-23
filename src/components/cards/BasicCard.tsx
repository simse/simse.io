import { Card } from "./primitives/Card";
import type { CommonProps } from "./primitives/types";

interface BasicCardProps extends CommonProps {
  description?: string;
}

export const BasicCard = ({ title, titleConfig, description, tag, size, href }: BasicCardProps) => {
  return (
    <Card.Base href={href} size={size} title={title} titleConfig={titleConfig}>
      <Card.Header tag={tag} tone="surface" />
      <Card.Body description={description} tone="surface" />
    </Card.Base>
  );
};
