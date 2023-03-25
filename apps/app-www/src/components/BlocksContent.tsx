import { RichTextBlock } from "./blocks/RichText";
import CodeSnippetBlock from "./blocks/CodeSnippet";
import EmailBlock from "./blocks/Email";

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
                    case "email":
                        return (
                            <EmailBlock key={i} to={block.to} from={block.from} subject={block.subject} date={block.date} body={block.body} />
                        );
                }
            })}
        </div>
    )
}

export default BlocksContent;