import { createContext } from "preact";
import type { ReferenceData } from "./types.ts";

export const ReferenceDataContext = createContext<ReferenceData>({
	wallpapers: [],
	music: [],
});
