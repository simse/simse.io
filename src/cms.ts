import { sanityClient } from "sanity:client";
import { formatDateWithYear } from "@utils/date";

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
}

interface Post {
  image?: string;
  title: string;
  slug: string;
  published: Date;
  content: any;
}

const getPosts = async (): Promise<Post[]> => {
  const rawPosts = await sanityClient.fetch<SanityPost[]>(
    `*[_type == "post" && defined(slug)] | order(publishedAt desc)`
  );

  return rawPosts.map((post) => ({
    ...post,
    slug: post.slug.current,
    published: new Date(post.published),
    image: post.image && post.image.asset.url,
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

export {
  getPosts,
  getPost
};

export type {
  Post
};