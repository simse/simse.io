<script lang="ts">
  import type { Post } from "@lib/cms/posts";
  import { imageUrlFromAssetRef } from "@lib/image";

  const { post }: { post: Post } = $props();

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-gb", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
</script>

<li class="my-8">
  <a class="group" href={`/${post.slug}`}>
    <div class="flex items-center">
      <img
        class="bg-zinc-900 h-8 w-8 mr-4 rounded-lg"
        src={post.image
          ? imageUrlFromAssetRef(post.image.asset._ref, {
              resizing_type: "fill",
              width: 200,
              height: 200,
              gravity: { type: "no" },
              enlarge: 1,
              format: "avif",
            })
          : ""}
        alt={post.image?.alt}
      />

      <h2 class="font-bold">{post.title}</h2>
    </div>

    <div
      class="text-zinc-300 bg-zinc-800/80 group-hover:bg-zinc-800 group-hover:scale-[1.02] origin-left transition-all mt-2 p-4 rounded-tl-lg rounded-2xl"
    >
      {post.excerpt}

      <span class="text-sm mt-4 block text-zinc-400"
        >{formatDate(post.published)}</span
      >
    </div>
  </a>
</li>
