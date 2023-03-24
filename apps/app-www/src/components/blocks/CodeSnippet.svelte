<script>
    import hljs from 'highlight.js';

    export let element;
</script>

<pre class="text-lg p-0 font-monospace"><code class="hljs px-5 py-3">{@html hljs.highlightAuto(element.code, element.language ? [element.language] : []).value}</code></pre>
