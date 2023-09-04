import slugify from "slugify";

export const slugifyText = (input: string) => slugify(input, { lower: true });