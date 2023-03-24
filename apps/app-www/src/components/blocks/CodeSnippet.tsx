import hljs from 'highlight.js';

interface CodeSnippetBlockProps {
    code: string;
    language?: string;
}

const CodeSnippetBlock = ({ code, language }: CodeSnippetBlockProps) => {
    const highlightedCode = hljs.highlightAuto(code, language ? [language] : []).value;

    return (
        <pre className="text-lg p-0 font-monospace"><code className="hljs px-5 py-3" dangerouslySetInnerHTML={{ __html: highlightedCode }}></code></pre>
    )
}

export default CodeSnippetBlock;