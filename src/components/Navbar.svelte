<script lang="ts">
  /*interface Props {
    activeItem?: 'Home' | 'Blog' | 'Projects' | 'Contact'
  }*/

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

  // const { activeItem } = Astro.props
  let overlayOpen = false;
</script>

<nav
  class="top-0 sticky z-30 mb-8 {overlayOpen ? '' : 'bg-zinc-950/70 backdrop-blur'}"
>
  <div class="max-w-7xl mx-auto py-4 px-4 grid grid-cols-3 items-center">
    <a class="text-lg transition-opacity {overlayOpen ? 'opacity-60' : ''}" href="/">Simon Sorensen</a>

    <ul class="flex items-center mx-auto">
      {#each items as { title, link }}

        <li>
          <a
            class={`
                  p-2 px-3 ${'text-black/50 dark:text-white/60'
              } hover:text-black dark:hover:text-white transition-colors
                `}
            href={link}
          >
            {title}
          </a>
        </li>

        {/each}
    </ul>

    <button class="ml-auto">
      <slot name="search-icon" />
    </button>
  </div>
</nav>

<div
  class="z-20 w-[1300px] mx-auto fixed top-0 left-1/2 -translate-x-1/2 bg-zinc-900/80 rounded h-1/2 transition-all pt-16 px-6
  duration-300 ease-in-out {overlayOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}"
>
  <p class="text-lg font-bold">Blog posts</p>
</div>

<div
  class="z-10 bg-black/70 w-full h-full top-0 left-0 fixed backdrop-blur transition-opacity
  duration-300 ease-in-out {overlayOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
></div>