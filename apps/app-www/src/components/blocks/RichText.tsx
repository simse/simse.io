import { Fragment } from 'react';
import escapeHTML from 'escape-html';
import { ExternalLink } from 'react-feather';

interface Node {
    text?: string;
    children?: Node[];
    type?: string;
    url?: string;
}

interface TextNode extends Node {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
}

const serialize = (children: Node[]) => children.map((node, i) => {
    if (node.text && !node.type) {
        let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />;

        const textNode = node as TextNode;

        if (textNode.bold) {
            text = (
                <strong key={i}>
                    {text}
                </strong>
            );
        }

        if (textNode.code) {
            text = (
                <code key={i}>
                    {text}
                </code>
            );
        }

        if (textNode.italic) {
            text = (
                <em key={i}>
                    {text}
                </em>
            );
        }

        if (textNode.strikethrough) {
            text = (
                <del key={i}>
                    {text}
                </del>
            );
        }

        if (textNode.underline) {
            text = (
                <u key={i}>
                    {text}
                </u>
            );
        }

        return (
            <Fragment key={i}>
                {text}
            </Fragment>
        );
    }

    if (!node || !node.children) {
        return null;
    }

    switch (node.type) {
        case 'h1':
            return (
                <h1 className="font-light my-16" key={i}>
                    {serialize(node.children)}
                </h1>
            );
        case 'h2':
            return (
                <h2 key={i}>
                    {serialize(node.children)}
                </h2>
            );
        case 'h3':
            return (
                <h3 key={i}>
                    {serialize(node.children)}
                </h3>
            );
        case 'h4':
            return (
                <h4 key={i}>
                    {serialize(node.children)}
                </h4>
            );
        case 'h5':
            return (
                <h5 key={i}>
                    {serialize(node.children)}
                </h5>
            );

        case 'h6':
            return (
                <h6 key={i}>
                    {serialize(node.children)}
                </h6>
            );
        case 'quote':
            return (
                <blockquote key={i}>
                    {serialize(node.children)}
                </blockquote>
            );
        case 'ul':
            return (
                <ul key={i}>
                    {serialize(node.children)}
                </ul>
            );
        case 'ol':
            return (
                <ol key={i}>
                    {serialize(node.children)}
                </ol>
            );
        case 'li':
            return (
                <li key={i}>
                    {serialize(node.children)}
                </li>
            );
        case 'link':
            return (
                <a className="text-blue-500 gap-1 no-underline hover:border-blue-500 border-b border-transparent inline-flex items-baseline " href={escapeHTML(node.url)} target="${node.newTab ? '_blank' : ''}">
                    {serialize(node.children )}
                    <ExternalLink size={16} className="self-center" />
                </a>
            );

        default:
            return (
                <p key={i}>
                    {serialize(node.children)}
                </p>
            );
    }
});

interface RichTextBlockProps {
    elements: Node[]
}

export const RichTextBlock = ({ elements }: RichTextBlockProps) => {
    const syntheticRootElement = {
        children: elements
    }

    return (
        <Fragment>{serialize([syntheticRootElement])}</Fragment>
    )
}