import { VERSION } from "../../../constants.ts";
import type { WindowProps } from "../types";
import WindowFrame from "../WindowFrame";

interface AboutWindowProps extends WindowProps {}

const AboutWindow = (props: AboutWindowProps) => {
  return (
    <WindowFrame
      title="Biography"
      initialSize={{ width: 300 }}
      initialPosition={{ x: 300, y: 150 }}
      {...props}
    >
      <div class="flex h-full flex-col items-center text-center">
        <header class="select-none">
          <p class="font-os-logo text-3xl">simonOS</p>
          <p>Version {VERSION}</p>
        </header>
        <p class="font-os-alt mt-4 text-sm leading-4 tracking-tighter">
          simonOS is developed in London, United Kingdom. Due to technical challenges the clock is
          stuck in 1988.
        </p>

        <p class="mt-12 mb-4">© All rights reserved Simon Software Industries 1986-1988</p>
      </div>
    </WindowFrame>
  );
};

export default AboutWindow;
