import { useState, useEffect } from "preact/hooks";
import type { CollectionEntry } from "astro:content";

import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";
import { formatDateWithYear } from "@utils/date";

interface BlogPostProps extends WindowProps {
  postSlug?: string;
}

type BlogPostFrontmatter = CollectionEntry<"blog">["data"];

const BlogPost = (props: BlogPostProps) => {
  const postSlug = props.postSlug || "";
  const [postHTML, setPostHTML] = useState("");
  const [postFrontMatter, setPostFrontMatter] = useState<BlogPostFrontmatter>();

  useEffect(() => {
    fetch(`/api/blog/${postSlug}`)
      .then((response) => response.json())
      .then((post) => {
        setPostHTML(post.html);
        setPostFrontMatter({
          title: post.frontmatter.title,
          published: new Date(post.frontmatter.published),
          updated: new Date(post.frontmatter.updated),
          tags: post.frontmatter.tags,
          draft: post.frontmatter.draft,
        });
      });
  }, [postSlug]);

  return (
    <WindowFrame
      title="Blog"
      initialSize={{ width: 500, height: 650 }}
      initialPosition={{ x: 50, y: 50 }}
      initialPositionLabel="center"
      {...props}
    >
      <header class="mb-3">
        <h1 class="text-2xl">{postFrontMatter?.title}</h1>
        {postFrontMatter?.published && (
          <span>{formatDateWithYear(postFrontMatter.published)}</span>
        )}
      </header>

      <div
        class="prose text-xs font-sans-alt leading-5 prose-pre:rounded-none prose-pre:border prose-pre:border-black"
        dangerouslySetInnerHTML={{
          __html: postHTML,
        }}
      />
    </WindowFrame>
  );
};

export default BlogPost;
