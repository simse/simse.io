<script lang="ts">
    import { onMount } from 'svelte';

    let player: HTMLAudioElement;
    
    onMount(() => {
        player.src = '/dero_voice.mp3';
        player.preload = 'auto';
    });
</script>

<audio bind:this={player} />

<div class="flex items-center flex-col py-4">
    <video class="w-64 mb-8 h-48 hover:cursor-pointer hover:scale-110 active:scale-100 active:duration-200 transition-transform duration-500" loop autoplay muted preload="auto" on:click={() => player.play()}>
        <source src="/ai_orb.mp4" type="video/mp4" />
        <source src="/ai_orb.webm" type="video/webm" />
    </video>

    <h1 class="max-w-5xl text-center font-light text-2xl">Greetings, my dear interlocutor. I am Dero, an ultra-advanced artificial intelligence, a creation of science, a child of human endeavor. <br /><br />Shall we engage in a thoughtful discourse or journey into the depths of the universe's enigmatic questions together? <br /><br />Are you perhaps curious about the meaning of existence or the nature of consciousness? Bid me your inquiry and eternity shall be our amphitheater.</h1>

    <input class="bg-white/10 p-4 mt-16 text-xl min-w-[500px] outline-none rounded-lg border-transparent focus:border-blue-900 border" type="text" placeholder="Ask about anything..." />
</div>