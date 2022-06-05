<script lang="ts">
    import { breadcrumbs } from "../stores";
    
    breadcrumbs.update(_ => [
        {
            path: "/contact",
            name: "Contact"
        }
    ])
</script>

<h1 class="text-3xl mb-8">Contact</h1>

<p class="text-lg">
    <strong>email:</strong> hello@simse.io
</p>