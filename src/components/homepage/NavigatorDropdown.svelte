<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import { navigate } from "astro:transitions/client";

  let focused = false;
</script>

<div class="relative flex items-center gap-3 bg-zinc-900 rounded px-6 py-4 z-20">
  <p class="text-xl text-zinc-300 min-w-fit">I want to</p>

  <Select.Root
    onSelectedChange={(v) => {
      navigate(v.value)
    }}
    onOpenChange={(o) => {
      focused = o;
    }}
  >
    <Select.Trigger class="">
      <Select.Value placeholder="do something cool I guess..." />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="/blog">read your blog</Select.Item>
      <Select.Item value="/projects">have a look through your projects</Select.Item>
      <Select.Item value="/about">know more about you</Select.Item>
      <Select.Item value="/">errrr... forget it man</Select.Item>
    </Select.Content>
  </Select.Root>

</div>

<div
    class="w-full h-full z-10 bg-black/80 transition-opacity fixed top-0 left-0 pointer-events-none"
    style={`opacity: ${focused ? 100 : 0}`}
/>