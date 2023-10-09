interface PageMeta {
    title: string;
    description: string;
    fonts?: Font[];
    transitions?: boolean;
    noIndex?: boolean;
    noFollow?: boolean;
}

interface Font {
    name: string;
    url: string;
    weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

export type {
    PageMeta
}