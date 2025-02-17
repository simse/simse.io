<script lang="ts">
  //import "iconify-icon";
  import MenuIcon from "virtual:icons/tabler/menu-2";

  const items = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Blog",
      link: "/blog",
    },
    {
      title: "Projects",
      link: "/projects",
    },
  ];

  const {
    activeItem,
  }: {
    activeItem?: string;
    uwuEasterEgg?: boolean;
  } = $props();
  let isMenuOpen = $state(false);
</script>

<nav class="top-0 sticky bg-zinc-950/90 backdrop-blur z-50">
  <div class="p-4 grid grid-cols-3">
    <a class="font-bold" href="/">Simon Sorensen</a>

    <ul class="sm:flex items-center hidden gap-4 justify-self-center">
      {#each items as { title, link }}
        <li>
          <a
            class={`hover:text-white
              ${title === activeItem ? "font-bold text-white" : "text-white/60"}`}
            href={link}
          >
            {title}
          </a>
        </li>
      {/each}
    </ul>

    <button
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
    </button>
  </div>
</nav>
