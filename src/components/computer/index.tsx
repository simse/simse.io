import { useState } from "preact/hooks";

import TopBar from "./TopBar";
import WindowFrame from "./WindowFrame";
import BiographyWindow from "./windows/Biography";

const Computer = () => {
  

  return (
    <div>
      <TopBar />

      <div class="relative w-full">
        <BiographyWindow />
      </div>
    </div>
  );
};

export default Computer;
