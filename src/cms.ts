import { sanityClient } from "sanity:client";
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient)

interface SanityPost {
  image?: {
    asset: {
      url: string;
    };
  };
  title: string;
  slug: {
    current: string;
  };
  published: string;
  content: any;
  tags: string[];
}

interface SanityProject {
  title: string;
  description: string;
  slug: {
    current: string;
  };
  published: string;
  details: any;
  languages: string[];
  technologies: string[];
  images?: {
    asset: {
      url: string;
    };
  }[];
  sourceCode?: string;
  demo?: string;
}

interface Post {
  image?: any;
  title: string;
  slug: string;
  published: Date;
  content: any;
  tags?: string[];
}

interface Project {
  title: string;
  description: string;
  slug: string;
  published: Date;
  details: any;
  languages: string[];
  technologies: string[];
  images: string[];
  sourceCode?: string;
  demo?: string;
}

const getPosts = async (): Promise<Post[]> => {
  const rawPosts = await sanityClient.fetch<SanityPost[]>(
    `*[_type == "post" && defined(slug)] | order(publishedAt desc)`
  );

  return rawPosts.map((post) => ({
    ...post,
    slug: post.slug.current,
    published: new Date(post.published),
  }));
}

const getImageBuilder = async (image: any) => {
  return builder.image(image);
}

const getProjects = async (): Promise<Project[]> => {
  const rawProjects = await sanityClient.fetch<SanityProject[]>(
    `*[_type == "project" && defined(slug)] | order(publishedAt desc)`
  );

  return rawProjects.map((project) => ({
    ...project,
    slug: project.slug.current,
    published: new Date(project.published),
    images: (project.images || []).map((image) => image.asset.url),
  }));
}

const getPost = async (slug: string): Promise<Post> => {
  const rawPost = await sanityClient.fetch<SanityPost>(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc) [0]`,
    { slug }
  );

  return {
    ...rawPost,
    slug: rawPost.slug.current,
    published: new Date(rawPost.published),
    image: rawPost.image && rawPost.image.asset.url,
  };
}

const getProject = async (slug: string): Promise<Project> => {
  const rawProject = await sanityClient.fetch<SanityProject>(
    `*[_type == "project" && slug.current == $slug] | order(publishedAt desc) [0]`,
    { slug }
  );

  return {
    ...rawProject,
    slug: rawProject.slug.current,
    published: new Date(rawProject.published),
    images: (rawProject.images || []).map((image) => image.asset.url),
  };
}

export {
  getPosts,
  getPost,
  getProjects,
  getProject,
  getImageBuilder
};

export type {
  Post,
  Project
};