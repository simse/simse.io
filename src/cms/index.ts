import { sanityClient } from "sanity:client";
import imageUrlBuilder from '@sanity/image-url';
import type { SanityAsset } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(sanityClient)

interface Image {
  alt: string;
  caption?: string;
  asset: SanityAsset;
}

interface SanityPost {
  _type: 'post';
  image?: Image;
  title: string;
  slug: {
    current: string;
  };
  published: string;
  content: any;
  tags: string[];
}

interface SanityProject {
  _type: 'project';
  title: string;
  description: string;
  slug: {
    current: string;
  };
  published: string;
  details: any;
  languages: string[];
  technologies: string[];
  images?: Image[];
  sourceCode?: string;
  demo?: string;
  type: string;
}

interface SanityWorkExperience {
  slug: {
    current: string;
  };
  title: string;
  officialTitle: string;
  location: string;
  details: any;
  employer: string;
  employerLogo?: SanityAsset;
  startDate: string;
  endDate?: string;
}

interface WorkExperience {
  slug: string;
  title: string;
  officialTitle: string;
  location: string;
  details: any;
  employer: string;
  employerLogo?: string;
  startDate: Date;
  endDate?: Date;
}

interface Post {
  _type: string;
  image?: {
    alt: string;
    caption?: string;
    asset: SanityAsset;
  };
  title: string;
  slug: string;
  published: Date;
  content: any;
  tags?: string[];
}

interface Project {
  _type: string;
  title: string;
  description: string;
  slug: string;
  published: Date;
  details: any;
  languages: string[];
  technologies: string[];
  images: Image[];
  sourceCode?: string;
  demo?: string;
  type: string;
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

const transformWorkExperience = (workExperience: SanityWorkExperience): WorkExperience => {
  const convertedWorkExperience: WorkExperience = {
    ...workExperience,
    employerLogo: undefined,
    slug: workExperience.slug.current,
    startDate: new Date(workExperience.startDate),
    endDate: workExperience.endDate ? new Date(workExperience.endDate) : undefined,
  }

  if (workExperience.employerLogo) {
    convertedWorkExperience.employerLogo = builder.image(workExperience.employerLogo).width(64).height(64).url();
  }

  return convertedWorkExperience;
}

const getWorkExperiences = async (): Promise<WorkExperience[]> => {
  const rawWorkExperiences = await sanityClient.fetch<SanityWorkExperience[]>(
    `*[_type == "experience" && defined(slug)] | order(startDate desc)`
  );

  return rawWorkExperiences.map((workExperience) => transformWorkExperience(workExperience));
}

const getImageBuilder = (image: any) => {
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
    images: project.images || [],
  }));
}

const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  const rawPosts = await sanityClient.fetch<SanityPost[]>(
    `*[_type == "post" && slug.current == $slug]`,
    { slug }
  );

  if (rawPosts.length < 1) {
    return undefined;
  }

  const rawPost = rawPosts[0];

  return {
    ...rawPost,
    slug: rawPost.slug.current,
    published: new Date(rawPost.published),
  };
}

export const getPageBySlug = async (slug: string): Promise<Post | Project | undefined> => {
  const rawPages = await sanityClient.fetch<Array<SanityProject | SanityPost>>(
    `*[slug.current == $slug]`,
    { slug }
  );

  if (rawPages.length < 1) {
    return undefined;
  }

  const page = rawPages[0];

  if (page._type === 'post') {
    return {
      ...page,
      slug: page.slug.current,
      published: new Date(page.published),
    };
  } else if (page._type === 'project') {
    return {
      ...page,
      slug: page.slug.current,
      published: new Date(page.published),
      images: page.images || [],
    }
  }
}
/*
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
*/
const getWorkExperienceBySlug = async (slug: string): Promise<WorkExperience> => {
  const rawWorkExperiences = await sanityClient.fetch<SanityWorkExperience[]>(
    `*[_type == "experience" && slug.current == "${slug}"]`
  );

  if (rawWorkExperiences.length < 1) {
    throw Error("work experience with slug: " + slug + " not found")
  }

  return transformWorkExperience(rawWorkExperiences[0]);
};

export {
  getPosts,
  getProjects,
  // getProject,
  getPostBySlug,
  getImageBuilder,
  getWorkExperiences,
  getWorkExperienceBySlug
};

export type {
  Post,
  Project,
  WorkExperience,
  Image
};