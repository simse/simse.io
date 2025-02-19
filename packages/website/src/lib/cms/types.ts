export type Image = {
  alt?: string;
  caption?: string;
  src: string;
  srcset: {
    src: string;
    size: string;
  }[];
}
