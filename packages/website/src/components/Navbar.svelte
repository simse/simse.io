<script lang="ts">
import 'iconify-icon'

const items = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Blog',
    link: '/blog',
  },
  {
    title: 'Projects',
    link: '/projects',
  },
]

const {
  activeItem,
}: {
  activeItem?: string
  uwuEasterEgg?: boolean
} = $props()
let isMenuOpen = $state(false)
</script>

<nav
  class="top-0 sticky z-30 mb-8 bg-zinc-950/70 backdrop-blur"
>
  <div class="max-w-7xl mx-auto py-2 px-4 grid grid-cols-2 md:grid-cols-3 items-center min-h-14">
    <a class="text-lg transition-opacity" href="/">
      Simon Sorensen
    </a>

    <ul class="sm:flex items-center hidden ml-auto md:mx-auto">
      {#each items as { title, link }}
        <li>
          <a
            class={`p-2 px-3 hover:text-white transition-colors
              ${title === activeItem ? 'font-bold text-white' : 'text-white/60'}`}
            href={link}
          >
            {title}
          </a>
        </li>
      {/each}
    </ul>

    <button class="ml-auto hidden" aria-label="Search">
      <iconify-icon icon="tabler:search" size={22}></iconify-icon>
    </button>

    <button class="sm:hidden uppercase text-sm font-bold ml-auto flex items-center gap-1" onclick={() => isMenuOpen = !isMenuOpen}>
      {#if isMenuOpen}
        <iconify-icon icon="tabler:x" size={18}></iconify-icon>
        Close
      {:else}
        <iconify-icon icon="tabler:menu-2" size={18}></iconify-icon>
        Menu
      {/if}
    </button>
  </div>
</nav>

<div 
  class="fixed top-[60px] left-0 w-full h-full bg-zinc-950/70 backdrop-blur z-20 transition-all duration-300"
  class:opacity-0={!isMenuOpen}
  class:opacity-100={isMenuOpen}
  class:pointer-events-none={!isMenuOpen}
  class:pointer-events-auto={isMenuOpen}
  class:-translate-y-10={!isMenuOpen}
  class:translate-y-0={isMenuOpen}
>
  <ul class="flex flex-col gap-4 p-2">
    {#each items as { title, link }}
      <li>
        <a class="p-2 hover:text-white transition-colors text-2xl" href={link}>{title}</a>
      </li>
    {/each}
  </ul>
</div>
