<script lang="ts">
    import { page } from '$app/stores';
    import Image from 'sveltekit-image';

    const pages = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Articles',
            path: '/articles'
        },
        {
            name: 'Projects',
            path: '/projects'
        }
    ];

    const matchPath = (itemPath: string): boolean => {
        if (itemPath === "/") {
            return itemPath === $page.url.pathname
        }

        return $page.url.pathname.startsWith(itemPath)
    }

    const itemClass = (itemPath: string): string => {
        if (matchPath(itemPath)) {
            return "font-bold"
        }

        return ""
    }
</script>

<nav class="flex justify-between py-2 bg-black pl-4 border-b border-white/20 items-center">
    <div class="flex items-center">
        <a href="/">
            <Image alt="memoji of Simon winking" src="https://assets.simse.io/android-chrome-256x256.png" width={32} height={32} />
        </a>

        <div class="border-l border-white/20 ml-4 pl-4 hidden sm:block">
            <a href="/" class="hover:underline">simse.io</a>
        </div>

    </div>

    <div class="flex items-center">
        <ul class="p-0 m-0 flex">
            {#each pages as page}
                <li><a class={`p-2 py-4 sm:p-4 sm:mx-2 hover:underline ${itemClass(page.path)}`} href={page.path}>{page.name}</a></li>
            {/each}
        </ul>
    </div>
</nav>