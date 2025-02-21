<script lang="ts">
import { quadInOut } from 'svelte/easing'
import { fade } from 'svelte/transition'
import Button from './Button.svelte'

function slideOut(_: Element, { delay = 0, duration = 400 }) {
  const directionModifier = direction === 'FORWARDS' ? '-' : ''

  return {
    delay,
    duration,
    css: (t: number) =>
      `transform: translateX(${directionModifier}${100 - quadInOut(t) * 100}%)`,
  }
}

function slideIn(_: Element, { delay = 0, duration = 400 }) {
  const directionModifier = direction === 'FORWARDS' ? '' : '-'

  return {
    delay,
    duration,
    css: (t: number) =>
      `transform: translateX(${directionModifier}${100 - quadInOut(t) * 100}%)`,
  }
}

const {
  images,
}: {
  images: {
    alt?: string
    caption?: string
    url: string
  }[]
} = $props()

let currentImageIndex = $state(0)
let direction = $state('FORWARDS')
let animating = $state(false)
const currentImage = $derived(images[currentImageIndex])
const hasPrevious = $derived(currentImageIndex - 1 >= 0)
const hasNext = $derived(currentImageIndex + 1 < images.length)
</script>

<div class="my-8">
  <div
    class="aspect-[3/2] bg-zinc-900 max-h-full w-full overflow-clip grid grid-cols-1 grid-rows-1"
  >
    {#each images as _, i}
      {#if i === currentImageIndex}
        <img
          class="object-cover col-span-1 row-span-1"
          src={currentImage.url}
          alt={currentImage.alt}
          in:slideIn={{ duration: 250 }}
          out:slideOut={{ duration: 250 }}
          onoutrostart={() => (animating = true)}
          onoutroend={() => (animating = false)}
        />
      {/if}
    {/each}
  </div>

  {#if images.length > 1}
    <div class="flex justify-between items-center mt-4">
      <p class="text-zinc-300" in:fade out:fade>{currentImage.caption}</p>

      <div class="flex gap-2">
        <Button
          style="primary"
          onClick={() => {
            direction = "BACKWARDS";
            currentImageIndex--;
          }}
          disabled={!hasPrevious && !animating}>Previous</Button
        >
        <Button
          disabled={!hasNext && !animating}
          style="primary"
          onClick={() => {
            direction = "FORWARDS";
            currentImageIndex++;
          }}>Next</Button
        >
      </div>
    </div>
  {/if}
</div>

