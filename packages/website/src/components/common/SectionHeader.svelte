<script lang="ts">
interface SectionHeaderProps {
  title: string
  href?: string
  headerAction?: string
  secondary?: boolean
}

const {
  title,
  href,
  headerAction,
  secondary = false,
}: SectionHeaderProps = $props()
</script>

<header class={`flex justify-between mb-2 border-zinc-700 pb-1 border-b ${secondary ? 'border-dashed' : ''}`}>
    {#if href}
    <a href={href}>
        <h2 class="font-bold">{title}</h2>
    </a>
    {:else}
    <h2 class="font-bold">{title}</h2>
    {/if}

    {#if headerAction && href}
    <a class="text-zinc-300 hover:text-white" href={href}>{headerAction}</a>
    {/if}
</header>