export type ImageSize = {
  src: string
  width: number
  height?: number
}

export type Image = {
  alt?: string
  caption?: string
  src: string
  sizes: {
    icon: ImageSize
    thumbnail: ImageSize
  }
}
