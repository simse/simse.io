import {VERSION} from "../../constants.ts";

type LoadingScreenProps = {
	loadingProgress: number;
	loadingText: string;
};

const LoadingScreen = ({
	loadingProgress,
	loadingText,
}: LoadingScreenProps) => {
	return (
		<div class="w-full h-full flex flex-col items-center">
			<header class="my-36">
				<h1 class="text-6xl font-logo">simonOS</h1>
				<p class="text-lg">Version {VERSION}</p>
			</header>

			<div>
				<div class="w-128 bg-black/20 h-2">
					<div
						class="h-full bg-black"
						style={{
							width: `${loadingProgress}%`,
						}}
					/>
				</div>

				<div class="flex justify-between">
					<span>{loadingProgress}%</span>
					<span>{loadingText}...</span>
				</div>
			</div>
		</div>
	);
};

export default LoadingScreen;
