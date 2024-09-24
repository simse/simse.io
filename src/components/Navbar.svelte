<script lang="ts">
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

export let activeItem = ''
let isMenuOpen = false
</script>

<nav
  class="top-0 sticky z-30 mb-8 bg-zinc-950/70 backdrop-blur"
>
  <div class="max-w-7xl mx-auto py-4 px-4 grid grid-cols-2 md:grid-cols-3 items-center">
    <a class="text-lg transition-opacity" href="/">Simon Sorensen</a>

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

    <button class="ml-auto hidden">
      <slot name="search-icon" />
    </button>

    <button class="sm:hidden uppercase text-sm font-bold ml-auto flex items-center gap-1" on:click={() => isMenuOpen = !isMenuOpen}>
      {#if isMenuOpen}
        <slot name="close-icon" />
        Close
      {:else}
        <slot name="menu-icon" />
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
