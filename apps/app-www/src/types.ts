interface Breadcrumb {
    path: string;
    name: string;
}

type Breadcrumbs = Array<Breadcrumb>

export type {
    Breadcrumb,
    Breadcrumbs
}