<script lang="ts">
import { navigate } from 'astro:transitions/client'
import 'iconify-icon'
import type { Snippet } from 'svelte'

interface Props {
  href?: string
  style?: 'primary' | 'secondary' | 'amber'
  icon?: string
  iconPlacement?: 'right' | 'left'
  target?: '_blank' | '_self'
  shortcut?: string
  bgColor?: string
  hoverBgColor?: string
  textColor?: string
  children?: Snippet
  class?: string
  onClick?: () => void
  disabled?: boolean
}

const {
  href,
  style = 'primary',
  icon,
  target = '_self',
  iconPlacement = 'left',
  shortcut,
  bgColor,
  hoverBgColor,
  textColor,
  children,
  class: _class,
  onClick,
  disabled = false,
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
    navigateToHref()
  }
}

const navigateToHref = () => {
  if (!href) return

  if (target === '_self') {
    navigate(href)
  } else {
    window.open(href, '_blank')?.focus()
  }
}

const classes = `
  flex items-center gap-2 w-fit py-1 px-3 disabled:pointer-events-none
  disabled:opacity-70 rounded-lg hover:cursor-pointer transition-all
  ${bgColorClass()} ${hoverBgColorClass()} ${textColorClass()} ${_class}
`
</script>

<svelte:window on:keydown={onKeyDown} />

<button
  class={classes}
  onclick={() => {
    navigateToHref();
    if (onClick) {
      onClick();
    }
  }}
  {disabled}
>
  {#if icon && iconPlacement === "left"}
    <iconify-icon {icon} size={18}></iconify-icon>
  {/if}

  {#if children}
    {@render children()}
  {/if}

  {#if icon && iconPlacement === "right"}
    <iconify-icon {icon} size={18}></iconify-icon>
  {/if}

  {#if shortcut}
    <code
      class="border border-black/20 bg-black/10 w-4 h-4 rounded font-bold flex items-center justify-center text-xs"
    >
      {shortcut}
    </code>
  {/if}
</button>

