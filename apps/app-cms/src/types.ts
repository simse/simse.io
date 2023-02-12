import * as pt from './payload-types';

interface Article extends Omit<pt.Article, 'category' | 'slug'> {
    category: pt.ArticleCategory[];
    slug: string;
}

interface Project extends Omit<pt.Project, 'media'> {
    media?: pt.Media;
}

interface Media extends pt.Media {}

export type {
    Article,
    Project,
    Media
}