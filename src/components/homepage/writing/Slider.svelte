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
        description?: string;
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

<div class="mb-16 flex flex-col lg:flex-row items-center gap-16">
    <!-- images -->
    <div class="h-[90vw] w-[90vw] lg:h-[50vw] lg:w-[50vw] max-w-[800px] max-h-[800px] grid grid-cols-1">
        {#each slides as slide, index}
        <div class={`transition-opacity image ${currentSlide === index ? 'selected' : ''} col-start-1 row-start-1`}>
            <img src={slide.image.src} width={800} height={800} alt={slide.imageAlt} class="object-cover" />

            <p class="-mt-3 lg:-mt-5 font-[NewYork] text-[#BA855E] text-4xl select-none uppercase">{slide.imageTitle}</p>
        </div>
        {/each}
    </div>

    <div class="flex-1 mx-auto max-h-[800px] grid grid-cols-1">
        {#each slides as slide, index}
        <div class={`transition-opacity ${currentSlide === index ? 'opacity-1' : 'opacity-0'} col-start-1 row-start-1 flex flex-col justify-center`}>
            <p class={`text-3xl lg:text-4xl mb-5`}>{slide.text}</p>

            {#if slide.description}
                <p class="text-zinc-300 text-xl max-w-5xl hidden md:block">{slide.description}</p>
            {/if}
        </div>
        {/each}
    </div>
</div>

<!-- navigation -->
<div class="flex gap-3 w-full justify-center">
    <button class="mr-auto border border-[#BA855E] text-[#BA855E] hover:bg-[#BA855E] hover:text-black transition-all px-4 py-2 rounded-full" on:click={previousSlide}>← Previous Fact</button>

    {#each slides as _, index}
    <div class={`h-3 w-3 rounded-full border border-[#BA855E] ${currentSlide === index ? 'bg-[#BA855E]' : ''}`}></div>
    {/each}

    <button class="ml-auto border border-[#BA855E] text-[#BA855E] hover:bg-[#BA855E] hover:text-black transition-all px-4 py-2 rounded-full" on:click={nextSlide}>Next Fact →</button>
</div>