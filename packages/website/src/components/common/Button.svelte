<script lang="ts">
import { navigate } from 'astro:transitions/client'
import 'iconify-icon'
import type { Snippet } from 'svelte'

interface Props {
  href: string
  style?: 'primary' | 'secondary' | 'amber'
  icon?: string
  target?: '_blank' | '_self'
  shortcut?: string
  bgColor?: string
  hoverBgColor?: string
  textColor?: string
  children?: Snippet
}

const {
  href,
  style = 'primary',
  icon,
  target = '_self',
  shortcut,
  bgColor,
  hoverBgColor,
  textColor,
  children,
}: Props = $props()

const styleToClass = {
  primary: {
    bg: 'bg-blue-600',
    hoverBg: 'hover:bg-blue-700',
    text: 'text-white',
  },
  secondary: {
    bg: 'bg-zinc-800',
    hoverBg: 'hover:bg-zinc-700',
    text: 'text-white',
  },
  amber: {
    bg: 'bg-amber-600',
    hoverBg: 'hover:bg-amber-700',
    text: 'text-black',
  },
}

const bgColorClass = () => {
  if (bgColor) return bgColor
  return styleToClass[style].bg
}

const hoverBgColorClass = () => {
  if (hoverBgColor) return hoverBgColor
  return styleToClass[style].hoverBg
}

const textColorClass = () => {
  if (textColor) return textColor
  return styleToClass[style].text
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === shortcut) {
    if (target === '_self') {
      navigate(href)
    } else {
      window.open(href, '_blank')?.focus()
    }
  }
}
</script>

<svelte:window on:keydown={onKeyDown} />

<a 
  class={`flex items-center gap-2 transition-colors w-fit py-1.5 px-3 rounded ${bgColorClass()} ${hoverBgColorClass()} ${textColorClass()}`} 
  href={href} 
  target={target}
  role="button"
>
    {#if icon}
    <iconify-icon icon={icon} size={18}></iconify-icon>
    {/if}

    {#if children}
    {@render children()}
    {/if}

    {#if shortcut}
    <code 
        class="border border-black/20 bg-black/10 w-4 h-4 rounded font-bold flex items-center justify-center text-xs"
    >
        {shortcut}
    </code>
    {/if}
</a>