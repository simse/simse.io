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
</script>

<nav
  class="top-0 sticky z-30 mb-8 bg-zinc-950/70 backdrop-blur"
>
  <div class="max-w-7xl mx-auto py-4 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center">
    <a class="text-lg transition-opacity" href="/">Simon Sorensen</a>

    <ul class="flex items-center ml-auto md:mx-auto">
      {#each items as { title, link }}

        <li>
          <a
            class={`
                  p-2 px-3 hover:text-white transition-colors
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
  </div>
</nav>