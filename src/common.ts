import slugify from "slugify";

export const slugifyText = (input: string) => slugify(input, { lower: true });

export const formatPostDate = (date: Date): string => date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

export const base64ToBinary = (base64: string) => new Uint8Array(atob(base64).split('').map(x => x.charCodeAt(0)));