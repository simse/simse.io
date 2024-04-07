import { useState } from "preact/hooks";
import type { CollectionEntry } from "astro:content";

import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";
import { formatDateWithYear } from "@utils/date";
import BlogPost from "./BlogPost";

interface BlogListProps extends WindowProps {
  posts?: CollectionEntry<"blog">[];
}

const BlogList = (props: BlogListProps) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const posts = props.posts || [];
  const openWindow = props.openWindow;

  return (
    <WindowFrame 
      title="Blog"
      initialSize={{ width: 500, height: 650 }}
      initialPosition={{ x: 550, y: 20 }}
      {...props}
    >
      <ul>
        {posts.map((post) => (
          <li class="flex mb-2 pb-2 border-b border-black items-center">
            <div class="bg-red-100 w-14 h-14 mr-4" />

            <button 
              class={`text-left p-1 border border-dotted border-transparent ${selectedPost === post.slug ? "bg-black text-white border-white" : ""}`}
              onClick={() => {
                if (selectedPost === post.slug) {
                  openWindow({
                    title: "Blog Post",
                    component: BlogPost,
                    postSlug: post.slug,
                    type: "blogPost",
                    id: `blog-${post.slug}`
                  });
                }
                setSelectedPost(post.slug);
              }}
            >
              <span class="text-xl">{post.data.title}</span>
              <p class="font-sans-alt text-xs">{formatDateWithYear(post.data.published)}</p>
            </button>
          </li>
        ))}
      </ul>
    </WindowFrame>
  );
};

export default BlogList;
