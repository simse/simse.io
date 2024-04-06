import { useState } from "preact/hooks";

import BiographyIcon from "@assets/desktop_icons/msagent-3.png";
import BlogIcon from "@assets/desktop_icons/address_book_pad.png";
import RadioIcon from "@assets/desktop_icons/cd_audio_cd_a-4.png";

const ICONS = [
  {
    name: "Biography",
    icon: BiographyIcon,
  },
  {
    name: "Blog",
    icon: BlogIcon,
  },
  {
    name: "Radio",
    icon: RadioIcon,
  },
];

interface DesktopProps {
  onIconDoubleClick: (name: string) => void;
}

const Desktop = ({
  onIconDoubleClick,
}: DesktopProps) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  return (
    <div 
      class="h-full w-full flex flex-col items-end pt-4 gap-5 relative"
    >
      <div
        class="h-full w-full z-0 absolute top-0 left-0"
        onClick={() => setSelectedIcon(null)}
      />

      {ICONS.map((icon) => (
        <button 
          class="flex flex-col items-center gap-2 z-10 min-w-24"
          onDblClick={() => {
            onIconDoubleClick(icon.name);
          }}
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
