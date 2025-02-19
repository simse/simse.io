<script lang="ts">
  import GithubIcon from "virtual:icons/mdi/github";

  const links = [
    {
      name: "Github",
      href: "https://github.com/simse",
      icon: GithubIcon,
    },
  ];
</script>

<header class="my-8 flex flex-col items-center">
  <div class="w-16 h-16 bg-zinc-900 rounded-full"></div>

  <h1 class="mt-4 font-medium">Simon Sorensen</h1>

  <p class="mt-4 text-zinc-300 text-center text-balance max-w-md">
    Software Engineer in London currently working at The LEGO Group. I love
    writing fast and efficient code.
  </p>

  <ul class="flex gap-4 mt-4 font-medium text-zinc-200">
    <li>
      {#each links as link}
        <a
          class="p-1 px-2 rounded-full hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-1"
          href={link.href}
          target="_blank"
        >
          <link.icon />
          {link.name}
        </a>
      {/each}
    </li>
  </ul>
</header>
