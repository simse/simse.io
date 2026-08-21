import { VERSION } from "../../constants.ts";

type LoadingScreenProps = {
  loadingProgress: number;
  loadingText: string;
};

const LoadingScreen = ({ loadingProgress, loadingText }: LoadingScreenProps) => {
  return (
    <div class="flex h-full w-full flex-col items-center">
      <header class="my-36">
        <h1 class="font-os-logo text-6xl">simonOS</h1>
        <p class="text-lg">Version {VERSION}</p>
      </header>

      <div>
        <div class="h-2 w-128 bg-black/20">
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
