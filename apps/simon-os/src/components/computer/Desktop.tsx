import { useState } from "preact/hooks";
import type { ImageMetadata } from "astro";

interface DesktopProps {
  icons: {
    name: string;
    icon: ImageMetadata;
    onDoubleClick: () => void;
  }[];
}

const Desktop = ({
  icons
}: DesktopProps) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  return (
    <div 
      class="h-full w-full sm:flex flex-col items-end pt-4 gap-5 absolute top-0 right-0 hidden"
    >
      <div
        class="h-full w-full z-0 absolute top-0 left-0"
        onClick={() => setSelectedIcon(null)}
      />

      {icons.map((icon) => (
        <button 
          class="flex flex-col items-center gap-2 z-10 min-w-24"
          onDblClick={() => icon.onDoubleClick()}
          onClick={() => setSelectedIcon(icon.name)}
        >
          <img
            src={icon.icon.src}
            alt="Radio"
            class="w-12 h-12"
            style={{
              imageRendering: "pixelated",
            }}
          />
          <span
            class={`px-0.5 leading-none border border-dotted 
            ${
              selectedIcon === icon.name
                ? "bg-black text-white border-white"
                : "border-transparent"
            }
          `}
          >
            {icon.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Desktop;
