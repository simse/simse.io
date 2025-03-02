import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";

interface BlogPostProps extends WindowProps {
  postSlug?: string;
}

const BlogPost = (props: BlogPostProps) => {
  const postSlug = props.postSlug || "";

  /*useEffect(() => {
    if (props.prefetchedPost) return;

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
        setIsLoaded(true);
      });
  }, [postSlug]);*/

  return (
    <WindowFrame
      title="Blog"
      initialSize={{ width: 500, height: 650 }}
      initialPosition={{ x: 50, y: 50 }}
      initialPositionLabel="center"
      {...props}
    >
      <p>
        Go to{" "}
        <a class="underline" href={`https://simse.io/${postSlug}`}>
          simse.io
        </a>{" "}
        to read this blog post (this limitation is temporary).
      </p>
    </WindowFrame>
  );
};

export default BlogPost;
