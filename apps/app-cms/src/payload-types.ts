/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "articles".
 */
export interface Article {
  id: string;
  slug?: string;
  name: string;
  subtitle?: string;
  summary?: string;
  category?: string[] | ArticleCategory[];
  media?: string | Media;
  content?: {
    [k: string]: unknown;
  }[];
  _status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "article-categories".
 */
export interface ArticleCategory {
  id: string;
  slug?: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
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
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects".
 */
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
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "project-languages".
 */
export interface ProjectLanguage {
  id: string;
  slug?: string;
  name?: string;
  colour?: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "project-categories".
 */
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
