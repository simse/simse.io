<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import { cn } from "$lib/utils.js";

	type $$Props = SelectPrimitive.TriggerProps;
	type $$Events = SelectPrimitive.TriggerEvents;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<SelectPrimitive.Trigger
	class={cn(
		"flex h-12 w-full items-center justify-between rounded text-lg bg-zinc-800 p-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-destructive [&>span]:line-clamp-1 data-[placeholder]:[&>span]:text-zinc-300",
		className
	)}
	{...$$restProps}
	let:builder
	on:click
	on:keydown
>
	<slot {builder} />
	<div>
		<ChevronDown class="h-4 w-4 opacity-50" />
	</div>
</SelectPrimitive.Trigger>
