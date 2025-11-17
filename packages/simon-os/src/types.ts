import type { CollectionEntry } from "astro:content";

// non-user customizable reference data
type ReferenceData = {
	wallpapers: CollectionEntry<"wallpapers">[];
	music: CollectionEntry<"music">[];
};

export type { ReferenceData };
