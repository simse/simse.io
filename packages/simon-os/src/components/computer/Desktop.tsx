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
		wallpapers.find((wallpaper) => wallpaper.id === selectedWallpaperId) ??
		wallpapers[0]
	).data;

	return (
		<div
			class="h-full w-full sm:flex flex-col items-end pt-4 gap-5 absolute top-0 right-0 hidden"
			style={{
				backgroundImage: `url(/wallpapers/${selectedWallpaper.image.src})`,
				backgroundRepeat: selectedWallpaper.image.repeat ?? "no-repeat",
				backgroundSize: selectedWallpaper.image.size ?? "100%",
				color: selectedWallpaper.contrastColour ?? "black",
			}}
		>
			<div
				class="h-full w-full z-0 absolute top-0 left-0"
				onClick={() => setSelectedIcon(null)}
				onKeyDown={() => setSelectedIcon(null)}
			/>

			{icons.map((icon) => (
				<button
					class="flex flex-col items-center gap-2 z-10 w-24"
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
