<script lang="ts">
//import "iconify-icon";
//import MenuIcon from "virtual:icons/tabler/menu-2";

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
  path,
}: {
  path?: string
  uwuEasterEgg?: boolean
} = $props()
//let isMenuOpen = $state(false);
</script>

<nav class="top-0 sticky bg-zinc-950/90 backdrop-blur z-50">
  <div class="p-3 grid grid-cols-2 md:grid-cols-3">
    <a class="font-bold" href="/">
      Simon<span class="hidden sm:inline ml-1">Sorensen</span>
    </a>

    <ul
      class="flex items-center gap-4 justify-self-end md:justify-self-center text-sm"
    >
      {#each items as { title, link }}
        <li>
          <a
            class={`hover:text-white
              ${link === path ? "underline text-white" : "text-white/60"}`}
            href={link}
          >
            {title}
          </a>
        </li>
      {/each}
    </ul>

    <!--<button
      class="sm:uppercase text-sm font-bold flex items-center gap-1 justify-self-end"
      onclick={() => (isMenuOpen = !isMenuOpen)}
    >
      {#if isMenuOpen}
        <iconify-icon icon="tabler:x" size={18}></iconify-icon>
        Close
      {:else}
        <MenuIcon />
        Menu
      {/if}
    </button>-->
  </div>
</nav>
