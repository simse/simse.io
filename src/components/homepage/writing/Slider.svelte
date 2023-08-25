<style lang="scss">
    .image {
        opacity: 0;
        transition-duration: 800ms;

        &.selected {
            opacity: 1;
        }
    }

    .aspect-square {
        aspect-ratio: 1 / 1;
    }

    .text {
        opacity: 0;

        &.selected {
            opacity: 1;
        }
    }
</style>

<script lang="ts">
    import type { ImageMetadata } from "astro";

    export let slides: {
        image: ImageMetadata;
        imageAlt: string;
        imageTitle: string;
        text: string;
    }[] = [];

    let currentSlide = 0;

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide += 1;
        }
    }

    function previousSlide() {
        if (currentSlide > 0) {
            currentSlide -= 1;
        }
    }
</script>

<div class="mb-16 flex items-center">
    <!-- previous -->
    <!--div class="mx-8 text-2xl border border-[#BA855E] text-[#BA855E] flex items-center justify-center rounded-full">
        <button class="p-8" on:click={previousSlide}>
            ←
        </button>
    </div-->

    <!-- images -->
    <div class="relative h-[35vw] w-[35vw] max-w-[800px] max-h-[800px]">
        {#each slides as slide, index}
        <div class={`absolute top-0 transition-all image ${currentSlide === index ? 'selected' : ''}`}>
            <img src={slide.image.src} width={800} height={800} alt={slide.imageAlt} class="object-cover" />

            <p class="absolute bottom-0 -mb-8 font-[NewYork] text-[#BA855E] text-6xl select-none uppercase">{slide.imageTitle}</p>
        </div>
        {/each}
    </div>

    <div class="flex-1 mx-auto px-16 text-4xl relative">
        {#each slides as slide, index}
        <div class="absolute top-0">
            <p class={`text transition-opacity ${currentSlide === index ? 'selected' : ''}`}>{slide.text}</p>
        </div>
        {/each}
    </div>

    <!-- next -->
    <!--div class="ml-auto px-8 text-2xl border border-[#BA855E] text-[#BA855E] flex items-center justify-center h-20 w-20 rounded-full">
        <button on:click={nextSlide}>
            →
        </button>
    </div-->
</div>

<!-- dots -->
<div class="flex gap-3 w-full justify-center">
    <button class="mr-auto" on:click={previousSlide}>previous</button>

    {#each slides as slide, index}
    <div class={`h-3 w-3 rounded-full border border-[#BA855E] ${currentSlide === index ? 'bg-[#BA855E]' : ''}`}></div>
    {/each}

    <button class="ml-auto" on:click={nextSlide}>next</button>
</div>