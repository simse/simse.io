import { useEffect, useState } from "preact/hooks";

import { formatDateWithYear } from "@utils/date";
import WindowFrame from "../WindowFrame";
import type { WindowProps } from "../types";
import BlogPost from "./BlogPost";

interface BlogListProps extends WindowProps {}

const BlogList = (props: BlogListProps) => {
	const [selectedPost, setSelectedPost] = useState<string | null>(null);
	const [posts, setPosts] = useState<
		{
			title: string;
			slug: string;
			published: string;
		}[]
	>([]);

	const openWindow = props.openWindow;

	const loadPosts = async () => {
		const resp = await fetch("https://simse.io/api/posts");
		const parsedResp = (await resp.json()) as {
			slug: string;
			title: string;
			published: string;
		}[];

		setPosts(parsedResp);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: on mount
	useEffect(() => {
		loadPosts();
	}, []);

	return (
		<WindowFrame
			title="Blog"
			initialSize={{ width: 500, height: 650 }}
			initialPosition={{ x: 550, y: 20 }}
			{...props}
		>
			<div class="flex flex-col h-full">
				<ul>
					{posts.map((post) => (
						<li
							class="flex mb-2 pb-2 border-b border-black last:border-transparent items-center"
							key={post.slug}
						>
							<div class="bg-red-100 w-14 h-14 mr-4" />

							<button
								class={`text-left p-1 border border-dotted border-transparent ${selectedPost === post.slug ? "bg-black text-white border-white" : ""}`}
								onClick={() => {
									openWindow({
										title: "Blog Post",
										component: BlogPost,
										postSlug: post.slug,
										type: "blogPost",
										id: `blog-${post.slug}`,
										meta: {
											title: post.title,
											description: "A blog post",
											path: `/blog/${post.slug}`,
										},
									});
								}}
								type="button"
							>
								<span class="text-xl leading-none">{post.title}</span>
								<p class="font-sans-alt text-[0.65rem]">
									{formatDateWithYear(new Date(post.published))}
								</p>
							</button>
						</li>
					))}
				</ul>

				<div
					class="flex-1 w-full"
					onClick={() => setSelectedPost(null)}
					onKeyDown={() => setSelectedPost(null)}
				/>
			</div>
		</WindowFrame>
	);
};

export default BlogList;
