import { formatDateWithYear } from "@utils/date";
import { useState } from "preact/hooks";

import type { WindowProps } from "../types";
import WindowFrame from "../WindowFrame";

interface BlogListProps extends WindowProps {}

const BlogList = (props: BlogListProps) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const posts: Array<{
    title: string;
    slug: string;
    published: string;
    image: {
      src: string;
      alt: string;
      sizes: {
        icon: {
          src: string;
        };
      };
    };
  }> = [];

  return (
    <WindowFrame
      title="Blog"
      initialSize={{ width: 500, height: 650 }}
      initialPosition={{ x: 550, y: 20 }}
      {...props}
    >
      <div class="flex h-full flex-col">
        <ul>
          {posts.map((post) => (
            <li
              class="mb-2 flex items-center border-b border-black pb-2 last:border-transparent"
              key={post.slug}
            >
              <img
                src={post.image.sizes.icon.src}
                alt={post.image.alt}
                class="mr-4 h-14 w-14 bg-black/10"
              />

              <button
                class={`border border-dotted border-transparent p-1 text-left ${selectedPost === post.slug ? "border-white bg-black text-white" : ""} hover:cursor-pointer`}
                type="button"
              >
                <span class="text-xl leading-none">{post.title}</span>
                <p class="font-os-alt text-[0.65rem]">
                  {formatDateWithYear(new Date(post.published))}
                </p>
              </button>
            </li>
          ))}
        </ul>

        <div
          class="w-full flex-1"
          onClick={() => setSelectedPost(null)}
          onKeyDown={() => setSelectedPost(null)}
        />
      </div>
    </WindowFrame>
  );
};

export default BlogList;
