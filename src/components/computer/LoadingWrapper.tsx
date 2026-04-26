import type { JSX } from "preact";
import { useContext, useLayoutEffect, useState } from "preact/hooks";
import { ReferenceDataContext } from "../../context.ts";
import LoadingScreen from "./LoadingScreen.tsx";

interface LoadingWrapperProps {
	children: JSX.Element;
}

const LoadingWrapper = ({ children }: LoadingWrapperProps) => {
	const { wallpapers } = useContext(ReferenceDataContext);
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [loadingText, setLoadingText] = useState("Starting up");
	const [showLoadingScreen, setShowLoadingScreen] = useState(true);

	useLayoutEffect(() => {
		const loadStart = new Date().getTime();

		const assetGroups = [
			{
				name: "wallpapers",
				assets: wallpapers
					.map((w) => `/wallpapers/${w.data.image.src}`)
					.filter(Boolean) as string[],
			},
			/*{
                name: "icons",
                assets: windowDefinitions.map((w) => w.icon).filter(Boolean),
            },*/
		];

		const totalAssets = assetGroups.reduce(
			(acc, group) => acc + group.assets.length,
			0,
		);
		let loadedCount = 0;

		const onAssetLoaded = () => {
			loadedCount++;
			const progress = (loadedCount / totalAssets) * 100;
			setLoadingProgress(progress);
		};

		const loadImage = (src: string) => {
			return new Promise<void>((resolve) => {
				const img = new Image();
				img.onload = () => {
					onAssetLoaded();
					resolve();
				};
				img.onerror = () => {
					onAssetLoaded(); // Count errors as "loaded" to not block the UI
					resolve();
				};
				img.src = src;
			});
		};

		const loadAssets = async () => {
			if (totalAssets === 0) {
				const timeout = setTimeout(() => {
					setShowLoadingScreen(false);
				}, 800);
				return () => clearTimeout(timeout);
			}

			for (const group of assetGroups) {
				if (group.assets.length === 0) continue;

				setLoadingText(`Loading ${group.name}...`);
				const promises = group.assets.map(loadImage);
				await Promise.all(promises);
			}

			const loadEnd = new Date().getTime();
			const loadDuration = loadEnd - loadStart;
			const minDisplayTime = 800;

			if (loadDuration >= minDisplayTime) {
				setShowLoadingScreen(false);
			} else {
				const remainingTime = minDisplayTime - loadDuration;
				setLoadingText("Finalising load sequence");
				setTimeout(() => {
					setShowLoadingScreen(false);
				}, remainingTime);
			}
		};

		loadAssets();
	}, [wallpapers]);

	if (showLoadingScreen) {
		return (
			<LoadingScreen
				loadingProgress={loadingProgress}
				loadingText={loadingText}
			/>
		);
	}

	return children;
};

export default LoadingWrapper;
