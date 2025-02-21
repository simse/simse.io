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

<table class={`min-w-64 max-w-96 ${!title ? "border-t" : ""} ${_class}`}>
  {#if title}
    <thead class="">
      <tr>
        <td class="p-2 font-bold bg-zinc-800 rounded-t-lg" colspan="2">
          {title}
        </td>
      </tr>
    </thead>
  {/if}
  <tbody>
    {#each rows.filter((row) => row !== undefined) as row}
      <tr class="border-b border-zinc-700">
        <td class="p-1.5 px-2 font-medium border-r border-zinc-700 w-1"
          >{row.key}</td
        >
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

