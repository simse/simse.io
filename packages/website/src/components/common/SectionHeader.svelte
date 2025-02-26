<script lang="ts">
  interface SectionHeaderProps {
    title: string;
    href?: string;
    secondary?: boolean;
  }

  const { title, href, secondary = false }: SectionHeaderProps = $props();

  const styles = `w-fit block bg-zinc-950 z-10 relative ${secondary ? "pr-2" : "px-2 mx-auto"}`;
</script>

<header class={`mb-2 relative font-semibold text-lg`}>
  {#if href}
    <a {href} class={styles}>
      <h2 class="">{title}</h2>
    </a>
  {:else}
    <h2 class={styles}>{title}</h2>
  {/if}

  <hr class="absolute top-1/2 border-t border-zinc-700 w-full z-0" />
</header>
