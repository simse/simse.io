<script lang="ts">
import GithubIcon from 'virtual:icons/mdi/github'
import BlueskyIcon from 'virtual:icons/simple-icons/bluesky'
import YoutubeIcon from 'virtual:icons/simple-icons/youtube'
import ImageOfMe from '../../assets/simse.jpg'

const links = [
  {
    name: 'Github',
    href: 'https://github.com/simse',
    icon: GithubIcon,
  },
  {
    name: 'Bluesky',
    href: 'https://bsky.app/profile/simseinc.bsky.social',
    icon: BlueskyIcon,
  },
  {
    name: 'Youtube',
    href: 'https://www.youtube.com/@simon.sorensen',
    icon: YoutubeIcon,
  },
]
</script>

<header class="my-8 flex flex-col items-center">
  <img
    src={ImageOfMe.src}
    alt="Simon"
    class="w-16 h-16 bg-zinc-900 rounded-full"
  />

  <h1 class="mt-4 font-medium">Simon Sorensen</h1>

  <p class="mt-4 text-zinc-300 text-center text-balance max-w-md">
    Software Engineer in London currently working at The LEGO Group. I love
    writing fast and efficient code.
  </p>

  <ul class="flex mt-4 font-medium text-zinc-200">
    {#each links as link}
      <li>
        <a
          class="p-1 px-2 rounded-full hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-1"
          href={link.href}
          target="_blank"
        >
          <link.icon />
          {link.name}
        </a>
      </li>
    {/each}
  </ul>
</header>
