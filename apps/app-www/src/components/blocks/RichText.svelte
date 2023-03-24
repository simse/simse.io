<script>
    export let element;

    const isText = element => element.text && !element.type;

    // console.log(element);

    // type to opening and closing tag
    const tags = {
        h1: ['<h1>', '</h1>'],
        h2: ['<h2>', '</h2>'],
        h3: ['<h3>', '</h3>'],
        h4: ['<h4>', '</h4>'],
        h5: ['<h5>', '</h5>'],
        h6: ['<h6>', '</h6>'],
        ol: ['<ol>', '</ol>'],
        ul: ['<ul>', '</ul>'],
        li: ['<li>', '</li>'],
        link: ['<a class="text-blue-500">', '</a>'],
    };

    const openingTag = (type) => {
        try {
            return tags[type][0];
        } catch (e) {
            return '<p>';
        }
    }

    const closingTag = (type) => {
        try {
            return tags[type][1];
        } catch (e) {
            return '</p>';
        }
    }
</script>

{#if isText(element)}
    {#if element.bold}
        <strong>{element.text}</strong>
    {:else if element.italic}
        <em>{element.text}</em>
    {:else if element.underline}
        <u>{element.text}</u>
    {:else if element.strikethrough}
        <s>{element.text}</s>
    {:else if element.code}
        <code>{element.text}</code>
    {:else}
        {element.text}
    {/if}
{:else}
    {@html openingTag(element.type)}{#if element.children}{#each element.children as child}<svelte:self element={child} />{/each}{/if}{@html closingTag(element.type)}
{/if}