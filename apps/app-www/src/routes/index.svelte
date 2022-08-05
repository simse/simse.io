<script>
    import { setBreadcrumbs } from "$lib/breadcrumbs"

    setBreadcrumbs([])

    const personalInformation = [
        ["Name", "Simon Sorensen"],
        ["City", "London 😎"],
        ["Occupation", "Software Engineering Intern"],
        ["Employer", "LEGO"],
        ["University", "Kingston University"],
        ["Degree", "Computer Science"],
        ["Social Security", "078-05-1120"]
    ]
</script>

<main class="py-32 border-b">
    <h1 class="text-3xl mb-4">Good evening 👋</h1>
    <p class="text-xl">Welcome to my slice of the internet.</p>
</main>

<div class="py-8 border-b">
    <h2 class="text-lg font-bold mb-4">About</h2>

    <table>
        <tbody>
            {#each personalInformation as p}
            <tr class="border-b border-x first:border-t">
                {#each p as i}
                <td class="py-2 px-2 min-w-[8rem] first:font-bold">{i}</td>
                {/each}
            </tr>
            {/each}
        </tbody>
    </table>
</div>

<div class="py-8 border-b">
    <h2 class="text-lg font-bold mb-4">Articles</h2>

    
</div>