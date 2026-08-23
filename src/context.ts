import { createContext } from "preact";

import type { ReferenceData } from "./components/computer/referenceData.ts";

export const ReferenceDataContext = createContext<ReferenceData>({
  wallpapers: [],
  music: [],
});
