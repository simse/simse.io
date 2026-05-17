import { Card } from "./primitives/Card";
import type { CommonProps } from "./primitives/types";

interface BasicCardProps extends CommonProps {
  description?: string;
}

export const BasicCard = ({ title, description, tag, size, href }: BasicCardProps) => {
  return (
    <Card.Base href={href} size={size}>
      <Card.Header tag={tag} tone="surface" />
      {title ? (
        <Card.Body title={title} description={description} tone="surface" pinToBottom />
      ) : null}
    </Card.Base>
  );
};
