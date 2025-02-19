<script lang="ts">
  import type { Image } from "@lib/cms/types";

  interface ExpandedBubbleProps {
    title: string;
    href: string;
    image?: Image;
    description?: string;
    smallText?: string;
  }

  const { title, href, image, description, smallText }: ExpandedBubbleProps =
    $props();
</script>

<a class="block group" {href}>
  <header class="flex justify-between">
    <h2 class="font-semibold mb-2">{title}</h2>

    <span class="text-sm text-zinc-400 mt-0.5">{smallText}</span>
  </header>

  {#if image}
    <img
      class="w-full aspect-[4/3] rounded-xl rounded-bl-md bg-zinc-900"
      src={image.src}
      alt={image.alt}
    />
  {:else}
    <div class="w-full aspect-[4/3] rounded-xl rounded-bl-md bg-zinc-900"></div>
  {/if}

  <p
    class="mt-4 bg-zinc-800/80 rounded-xl rounded-tl-md p-4 transition-all group-hover:bg-zinc-800 group-hover:scale-[1.02] origin-left"
  >
    {description}
  </p>
</a>
