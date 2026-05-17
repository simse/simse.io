import { createContext, type ComponentChildren } from "preact";
import { useContext } from "preact/hooks";
import InternalLinkIcon from "~icons/lucide/arrow-right";
import ExternalLinkIcon from "~icons/lucide/arrow-up-right";

import type { PictureData } from "./picture";

type Tone = "surface" | "image-light" | "image-dark";

const EXTERNAL_PATTERN = /^(https?:\/\/|\/\/|mailto:|tel:)/i;
const isExternalHref = (href: string) => EXTERNAL_PATTERN.test(href);

const CardLinkContext = createContext<{ isLink: boolean; isExternalLink: boolean }>({
  isLink: false,
  isExternalLink: false,
});

interface BaseProps {
  href?: string;
  children: ComponentChildren;
  size?: 1 | 2;
}

const Base = ({ href, children, size = 1 }: BaseProps) => {
  const className = `group relative flex flex-col overflow-clip rounded-lg bg-zinc-100 transition-colors hover:bg-zinc-200 ${size === 2 ? "col-span-2 aspect-[2/1]" : "aspect-square"}`;
  const value = { isLink: !!href, isExternalLink: isExternalHref(href ?? "") };

  if (href) {
    const external = isExternalHref(href);
    return (
      <CardLinkContext.Provider value={value}>
        <a
          class={className}
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      </CardLinkContext.Provider>
    );
  }

  return (
    <CardLinkContext.Provider value={value}>
      <div class={className}>{children}</div>
    </CardLinkContext.Provider>
  );
};

interface HeaderProps {
  tag?: string;
  tone?: Tone;
  subtleTitle?: string;
}

const headerContainerClass: Record<Tone, string> = {
  surface: "relative px-6 pt-6 text-zinc-700",
  "image-light": "relative px-6 pt-6 text-white",
  "image-dark": "relative px-6 pt-6 text-zinc-900",
};

const pillClass: Record<Tone, string> = {
  surface: "rounded-full bg-black/5 px-3 py-1 text-sm font-medium text-zinc-600",
  "image-light":
    "rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm",
  "image-dark":
    "rounded-full bg-black/10 px-3 py-1 text-sm font-medium text-zinc-900 backdrop-blur-sm",
};

const Header = ({ tag, tone = "surface", subtleTitle }: HeaderProps) => {
  const { isLink, isExternalLink } = useContext(CardLinkContext);

  if (!tag && !subtleTitle && !isLink) {
    return null;
  }

  return (
    <header class={headerContainerClass[tone]}>
      <div class="flex items-center">
        {tag ? <span class={pillClass[tone]}>{tag}</span> : null}
        {subtleTitle ? <span class="ml-4 text-sm">{subtleTitle}</span> : null}
        {isLink && isExternalLink ? <ExternalLinkIcon class="ml-auto" /> : null}
        {isLink && !isExternalLink ? <InternalLinkIcon class="ml-auto" /> : null}
      </div>
    </header>
  );
};

interface BodyProps {
  title?: string;
  description?: string;
  tone?: Tone;
  pinToBottom?: boolean;
}

const bodyTitleClass: Record<Tone, string> = {
  surface: "my-2 text-2xl font-medium text-zinc-950",
  "image-light": "my-2 text-2xl font-medium text-white",
  "image-dark": "my-2 text-2xl font-medium text-zinc-950",
};

const bodyDescriptionClass: Record<Tone, string> = {
  surface: "",
  "image-light": "text-white/80",
  "image-dark": "text-zinc-800",
};

const Body = ({ title, description, tone = "surface", pinToBottom = false }: BodyProps) => {
  if (!title && !description) {
    return null;
  }
  const containerClass = ["relative px-6 pb-6", pinToBottom ? "mt-auto" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={containerClass}>
      {title ? <h2 class={bodyTitleClass[tone]}>{title}</h2> : null}
      {description ? <p class={bodyDescriptionClass[tone] || undefined}>{description}</p> : null}
    </div>
  );
};

interface PictureProps {
  picture: PictureData;
  alt?: string;
  class?: string;
  imgClass?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  placeholder?: string;
}

const Picture = ({
  picture,
  alt = "",
  class: pictureClass,
  imgClass,
  loading = "lazy",
  decoding = "async",
  placeholder,
}: PictureProps) => {
  const style = placeholder
    ? {
        backgroundImage: `url("${placeholder}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;
  return (
    <picture class={pictureClass} style={style}>
      {picture.sources.map((source) => (
        <source srcset={source.srcset} type={source.type} />
      ))}
      <img
        class={imgClass}
        src={picture.src}
        srcset={picture.srcset}
        width={picture.width}
        height={picture.height}
        alt={alt}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  );
};

interface BackgroundImageProps {
  picture: PictureData;
  alt?: string;
  placeholder?: string;
}

const BackgroundImage = ({ picture, alt = "", placeholder }: BackgroundImageProps) => {
  return (
    <Picture
      picture={picture}
      alt={alt}
      class="absolute inset-0 h-full w-full"
      imgClass="h-full w-full object-cover transition-transform group-hover:scale-105"
      placeholder={placeholder}
    />
  );
};

export const Card = { Base, Header, Body, Picture, BackgroundImage };
