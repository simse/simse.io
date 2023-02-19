import * as pt from './payload-types';

interface Article extends Omit<pt.Article, 'category' | 'slug' | 'media'> {
    category: pt.ArticleCategory[];
    slug: string;
    media?: pt.Media;
}

interface Project extends Omit<pt.Project, 'media' | 'category' | 'language' | 'slug'> {
    slug: string;
    media?: pt.Media;
    category: pt.ProjectCategory;
    language: pt.ProjectLanguage[];
}

interface Media extends pt.Media {}

export type {
    Article,
    Project,
    Media
}