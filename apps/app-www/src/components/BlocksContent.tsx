import { RichTextBlock } from "./blocks/RichText";
import CodeSnippetBlock from "./blocks/CodeSnippet";

interface BlocksContentProps {
    blocks: any[]
}

const BlocksContent = ({ blocks }: BlocksContentProps) => {


    return (
        <div>
            {blocks.map((block, i) => {
                switch (block.blockType) {
                    case "richText":
                        return (
                            <RichTextBlock key={i} elements={block.richText} />
                        );
                    case "codeSnippet":
                        return (
                            <CodeSnippetBlock key={i} code={block.code} language={block.language} />
                        );
                }
            })}
        </div>
    )
}

export default BlocksContent;