import SimonPicture from "@assets/me_but_dithered.png";

import type { WindowProps } from "../types";
import WindowFrame from "../WindowFrame";

interface BiographyWindowProps extends WindowProps {}

const BiographyWindow = (props: BiographyWindowProps) => {
  return (
    <WindowFrame
      title="Biography"
      initialSize={{ width: 350, height: 500 }}
      initialPosition={{ x: 50, y: 50 }}
      {...props}
    >
      <div class="float-left mr-3">
        <img
          src={SimonPicture.src}
          alt="Simon"
          class="mb-1 h-28 w-28 bg-black/10"
          style={{
            imageRendering: "pixelated",
          }}
        />
      </div>

      <div class="mb-4">
        <h1 class="font-os-logo text-2xl">Simon Sorensen</h1>
        <span class="font-os-alt leading-3 tracking-tighter">
          24-year old Software Engineer™ in London, UK.
        </span>

        <hr class="mt-2" />
      </div>

      <div class="font-os-alt mb-4 leading-5 tracking-tighter">
        <p className="my-4">Hello! Welcome to my website, feel free to have a look around.</p>

        <p className="my-4">
          I've spent my entire working life at The LEGO Group, first as a student worker, then a
          software engineering intern and now a full-time software engineer.
        </p>

        <p className="my-4">
          Currently I'm on the Pick a Brick team, but I've previously worked on platform services,
          cart services, payment services, cart and checkout, experiences, and finally internal
          applications.
        </p>
      </div>
    </WindowFrame>
  );
};

export default BiographyWindow;
