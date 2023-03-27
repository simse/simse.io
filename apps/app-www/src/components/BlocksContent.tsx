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
                            <div className="max-w-4xl">
                                <RichTextBlock key={i} elements={block.richText} />
                            </div>
                        );
                    case "codeSnippet":
                        return (
                            <div className="max-w-4xl">
                                <CodeSnippetBlock key={i} code={block.code} language={block.language} />
                            </div>
                        );
                    case "email":
                        return (
                            <div className="max-w-4xl">
                                <EmailBlock key={i} to={block.to} from={block.from} subject={block.subject} date={block.date} body={block.body} />
                            </div>
                        );
                }
            })}
        </div>
    )
}

export default BlocksContent;