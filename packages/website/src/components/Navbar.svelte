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
  class="top-0 sticky border-b border-zinc-700 border-dashed bg-zinc-900 z-50"
>
  <div class="py-2 px-4 flex items-center">
    <a class="text-lg transition-opacity bg-blue-900 w-fit px-2 -ml-2" href="/">
      Simon Sorensen
    </a>

    <ul class="sm:flex items-center hidden ml-auto gap-4">
      {#each items as { title, link }}
        <li>
          <a
            class={`hover:text-white
              ${title === activeItem ? 'font-bold text-white' : 'text-white/60'}`}
            href={link}
          >
            {title}
          </a>
        </li>
      {/each}
    </ul>

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
  class="fixed top-[46px] left-0 w-full h-fit bg-zinc-900 z-50 border-b border-zinc-700"
  class:opacity-0={!isMenuOpen}
  class:opacity-100={isMenuOpen}
  class:pointer-events-none={!isMenuOpen}
  class:pointer-events-auto={isMenuOpen}
  class:-translate-y-10={!isMenuOpen}
  class:translate-y-0={isMenuOpen}
>
  <ul class="flex gap-4 p-2">
    {#each items as { title, link }}
      <li>
        <a class="" href={link}>{title}</a>
      </li>
    {/each}
  </ul>
</div>

<div
  class="fixed top-0 left-0 w-full h-full bg-black z-30"
  class:opacity-0={!isMenuOpen}
  class:opacity-80={isMenuOpen}
  class:pointer-events-none={isMenuOpen}
  class:pointer-events-auto={!isMenuOpen}
  class:hidden={!isMenuOpen}
></div>