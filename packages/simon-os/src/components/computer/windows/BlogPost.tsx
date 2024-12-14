import type { CollectionEntry } from "astro:content";
import { useEffect, useState } from "preact/hooks";

import { formatDateWithYear } from "@utils/date";
import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";

interface BlogPostProps extends WindowProps {
	postSlug?: string;
	prefetchedPost?: {
		html: string;
		frontmatter: BlogPostFrontmatter;
	};
}

type BlogPostFrontmatter = CollectionEntry<"blog">["data"];

const BlogPost = (props: BlogPostProps) => {
	const postSlug = props.postSlug || "";
	const [postHTML, setPostHTML] = useState(props.prefetchedPost?.html || "");
	const [postFrontMatter, setPostFrontMatter] =
		useState<BlogPostFrontmatter | null>(
			props.prefetchedPost?.frontmatter || null,
		);
	const [isLoaded, setIsLoaded] = useState(!!props.prefetchedPost);

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
			{!isLoaded ? (
				<p>
					Go to{" "}
					<a class="underline" href={`https://simse.io/${postSlug}`}>
						simse.io
					</a>{" "}
					to read this blog post (this limitation is temporary).
				</p>
			) : (
				<>
					<header class="mb-3">
						<h1 class="text-2xl">{postFrontMatter?.title}</h1>
						{postFrontMatter?.published && (
							<span>
								{formatDateWithYear(new Date(postFrontMatter.published))}
							</span>
						)}
					</header>

					<div
						class="pr-2 prose text-xs font-sans-alt leading-5 prose-pre:rounded-none
            prose-pre:border prose-pre:border-black prose-hr:border-black pb-4"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: no user content
						dangerouslySetInnerHTML={{
							__html: postHTML,
						}}
					/>
				</>
			)}
		</WindowFrame>
	);
};

export default BlogPost;
