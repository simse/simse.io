import { dev } from '$app/env';

// constructs an image url asking the Sorensen Cloud Image service to resize
const createImageUrl = (source: string, width: number, height: number): string => {
    if (!source) return ""

    // in dev mode and img src is relative, use picture of a dog
    if (dev && !source.startsWith("http")) {
        source = "https://i.imgur.com/AlAZW4U.jpg"
    } else if (!source.startsWith("http")) {
        source = "https://simse.io/images/" + source
    }

    return `https://images.sorensen.cloud/unsafe/${width}x${height}/smart/filters:format(webp)/${source}`
}

// generate a srcset group
const createSrcset = (source: string): string => {
    const sizes = [200, 400, 600, 1000, 1200, 1400, 2000]

    if (source === "") {
        return ""
    }

    return sizes.map(size => {
        return createImageUrl(source, size, size/5*3) + ` ${size}w`
    }).join(', ')
}

export {
    createImageUrl,
    createSrcset
}