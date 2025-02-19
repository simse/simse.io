<script lang="ts">
  import type { Image } from "@lib/cms/types";

  interface CompactBubbleProps {
    title: string;
    image?: Image;
    href: string;
    description: string;
    smallText?: string;
  }

  const { title, image, href, description, smallText }: CompactBubbleProps =
    $props();
</script>

<a class="group" {href}>
  <div class="flex items-center">
    {#if image}
      <img
        class="bg-zinc-900 h-8 w-8 mr-4 rounded-lg"
        src={image.src}
        alt={image.alt}
      />
    {/if}

    <h2 class="font-bold">{title}</h2>
  </div>

  <div
    class="text-zinc-300 bg-zinc-800/80 group-hover:bg-zinc-800 group-hover:scale-[1.02] origin-left transition-all mt-2 p-4 rounded-tl-lg rounded-2xl"
  >
    {description}

    {#if smallText}
      <span class="text-sm mt-4 block text-zinc-400">{smallText}</span>
    {/if}
  </div>
</a>
