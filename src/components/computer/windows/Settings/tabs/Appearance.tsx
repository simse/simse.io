import CheckMarkIcon from "@components/icons/CheckMarkIcon.tsx";
import useStore from "@store";
import { useContext } from "preact/hooks";
import { useShallow } from "zustand/react/shallow";

import { ReferenceDataContext } from "../../../../../context.ts";

const AppearanceTab = () => {
  const { wallpapers } = useContext(ReferenceDataContext);

  const { selectedWallpaperId, setSelectedWallpaperId } = useStore(
    useShallow((state) => ({
      selectedWallpaperId: state.selectedWallpaperId,
      setSelectedWallpaperId: state.setSelectedWallpaperId,
    })),
  );

  return (
    <div>
      <h2 class="mb-4 text-xl">Wallpaper</h2>
      <ul class="grid grid-cols-3 gap-2">
        {wallpapers.map(({ data: wallpaper }) => (
          <li
            key={wallpaper.id}
            class="mb-2 hover:cursor-pointer"
            onClick={() => setSelectedWallpaperId(wallpaper.id)}
            onKeyDown={() => setSelectedWallpaperId(wallpaper.id)}
          >
            <div
              class="flex aspect-[5/3] w-full items-center justify-center border"
              style={{
                backgroundImage: `url(/wallpapers/${wallpaper.image.src})`,
                backgroundRepeat: wallpaper.image.repeat ?? "no-repeat",
                backgroundSize: "36px",
                imageRendering: "pixelated",
              }}
            >
              {selectedWallpaperId === wallpaper.id ? (
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white">
                  <CheckMarkIcon />
                </div>
              ) : null}
            </div>
            <span class="">{wallpaper.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppearanceTab;
