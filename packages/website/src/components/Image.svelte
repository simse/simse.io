<script lang="ts">
import CloseIcon from 'virtual:icons/tabler/x'
import type { Image } from '@lib/cms/types'

interface ImageProps {
  image: Image
}

const { image }: ImageProps = $props()

let dialog: HTMLDialogElement

const openLightbox = () => {
  dialog.showModal()
}

const closeLightbox = () => {
  dialog.close()
}

const onDialogClick = (event: MouseEvent) => {
  if (event.target === dialog) {
    closeLightbox()
  }
}
</script>

<picture
  class="hover:cursor-pointer"
  onclick={openLightbox}
  onkeydown={openLightbox}
  role="button"
  tabindex={1}
>
  <img src={image.src} alt={image.alt} />
</picture>

<dialog
  class="bg-transparent left-1/2 -translate-x-1/2 max-w-5xl w-4/5 top-1/2 -translate-y-1/2"
  bind:this={dialog}
  onclick={onDialogClick}
  role="none"
>
  <img class="w-full" src={image.src} alt={image.alt} />

  <button
    class="flex items-center gap-1 text-white uppercase text-sm font-bold hover:cursor-pointer mt-4"
    onclick={closeLightbox}
  >
    <CloseIcon class="text-white" height={20} width={20} />

    Close
  </button>
</dialog>
