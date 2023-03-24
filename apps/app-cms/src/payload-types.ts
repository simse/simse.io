/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    articles: Article;
    'article-categories': ArticleCategory;
    media: Media;
    projects: Project;
    'project-categories': ProjectCategory;
    'project-languages': ProjectLanguage;
  };
  globals: {};
}
export interface User {
  id: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
}
export interface Article {
  id: string;
  published_at?: string;
  slug?: string;
  name?: string;
  subtitle?: string;
  summary?: string;
  category?: string[] | ArticleCategory[];
  media?: string | Media;
  contentBlocks?: (
    | {
        richText: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'richText';
      }
    | {
        title?: string;
        code: string;
        language?: string;
        highlightedLines?: string;
        id?: string;
        blockName?: string;
        blockType: 'codeSnippet';
      }
    | {
        from: string;
        to: string;
        subject: string;
        date: string;
        body: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'email';
      }
    | {
        media: string | Media;
        id?: string;
        blockName?: string;
        blockType: 'image';
      }
  )[];
  content?: {
    [k: string]: unknown;
  }[];
  _status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}
export interface ArticleCategory {
  id: string;
  slug?: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
export interface Media {
  id: string;
  alt?: string;
  credit?: string;
  cloudflareImageId?: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  createdAt: string;
  updatedAt: string;
}
export interface Project {
  id: string;
  slug?: string;
  name?: string;
  summary?: string;
  language?: string[] | ProjectLanguage[];
  category?: string | ProjectCategory;
  status?: 'maintained' | 'security_fixes' | 'done' | 'archived' | 'wont_complete';
  source_code?: string;
  demo?: string;
  media?: string | Media;
  description?: {
    [k: string]: unknown;
  }[];
  createdAt: string;
  updatedAt: string;
}
export interface ProjectLanguage {
  id: string;
  slug?: string;
  name: string;
  colour: string;
  text_colour: string;
  createdAt: string;
  updatedAt: string;
}
export interface ProjectCategory {
  id: string;
  slug?: string;
  name?: string;
  plural?: string;
  description?: string;
  sort_hint?: number;
  createdAt: string;
  updatedAt: string;
}
