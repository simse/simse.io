<script lang="ts">
interface TableProps {
  title?: string
  rows: (
    | {
        key: string
        value: string
        href?: string
      }
    | undefined
  )[]
  class?: string
}

const { title, rows, class: _class }: TableProps = $props()
</script>

<table class={`border-l-4 border-r border-zinc-700 shadow-table min-w-64 ${!title ? 'border-t' : ''} ${_class}`}>
    {#if title}
    <thead class="border-t border-zinc-700 border-dashed">
        <tr>
            <td class="p-1 font-bold border-b border-zinc-500" colspan="2">
                {title}
            </td>
        </tr>
    </thead>
    {/if}
    <tbody>
        {#each rows.filter((row) => row !== undefined) as row}
        <tr class="border-b border-zinc-700">
            <td class="p-1 border-r border-zinc-700">{row.key}</td>
            <td class="p-1 px-2">
                {#if row.href}
                <a class="underline text-blue-400" href={row.href}>{row.value}</a>
                {:else}
                {row.value}
                {/if}
            </td>
        </tr>
        {/each}
    </tbody>
</table>