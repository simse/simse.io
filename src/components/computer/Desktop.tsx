import type { ImageMetadata } from "astro";
import { useContext, useState } from "preact/hooks";

import { ReferenceDataContext } from "../../context.ts";
import useStore from "../../store";

interface DesktopProps {
  icons: {
    name: string;
    icon: ImageMetadata;
    onDoubleClick: () => void;
  }[];
}

const Desktop = ({ icons }: DesktopProps) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const selectedWallpaperId = useStore((state) => state.selectedWallpaperId);
  const { wallpapers } = useContext(ReferenceDataContext);

  const selectedWallpaper = (
    wallpapers.find((wallpaper) => wallpaper.id === selectedWallpaperId) ?? wallpapers[0]
  ).data;

  return (
    <div
      class="absolute top-0 right-0 hidden h-full w-full flex-col items-end gap-5 pt-4 sm:flex"
      style={{
        backgroundImage: `url(/wallpapers/${selectedWallpaper.image.src})`,
        backgroundRepeat: selectedWallpaper.image.repeat ?? "no-repeat",
        backgroundSize: selectedWallpaper.image.size ?? "100%",
        color: selectedWallpaper.contrastColour ?? "black",
      }}
    >
      <div
        class="absolute top-0 left-0 z-0 h-full w-full"
        onClick={() => setSelectedIcon(null)}
        onKeyDown={() => setSelectedIcon(null)}
      />

      {icons.map((icon) => (
        <button
          class="z-10 flex w-24 flex-col items-center gap-2"
          onDblClick={() => {
            icon.onDoubleClick();
            setSelectedIcon(null);
          }}
          onClick={() => setSelectedIcon(icon.name)}
          type="button"
          key={icon.name}
        >
          <img
            src={icon.icon.src}
            alt="Radio"
            class="h-12 w-12"
            style={{
              imageRendering: "pixelated",
            }}
          />
          <span
            class={`border border-dotted px-0.5 leading-none ${
              selectedIcon === icon.name ? "border-white bg-black text-white" : "border-transparent"
            } `}
          >
            {icon.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Desktop;
