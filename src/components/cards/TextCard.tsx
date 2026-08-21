import { Card } from "./primitives/Card";
import type { CommonProps } from "./primitives/types";

interface BasicCardProps extends CommonProps {
  description?: string;
}

export const TextCard = ({ title, titleConfig, description, tag, size, href }: BasicCardProps) => {
  return (
    <Card.Base href={href} size={size} title={title} titleConfig={titleConfig}>
      <Card.Header tag={tag} tone="surface" />
      <div class="mt-auto p-6">
        <p
          class="font-sans-serif text-3xl font-light tracking-tight"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></p>
      </div>
    </Card.Base>
  );
};
