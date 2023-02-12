import { CollectionBeforeChangeHook } from 'payload/types';
import { Configuration, OpenAIApi } from 'openai';
import { Text } from 'slate';

// serialize slate document to just text
const serialize = (children: unknown[]): string => {
    if (!children) {
        return "";
    }

    return children.map((node: any) => {
        if (Text.isText(node)) {
            return node.text;
        } else {
            return serialize(node.children);
        }
    }).join('');

}

export const summarise: CollectionBeforeChangeHook = async ({
    data,
}) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
        // only try if there is text, no summary and the article is being or has been published
        if (data.content && !data.summary && data._status === "published") {
            const completion = await openai.createCompletion({
                model: 'text-davinci-002',
                prompt: `Write an engaing reader hook for the following article: "${serialize(data.content)}". END ARTICLE.`,
                max_tokens: 200,
                temperature: 0.8
            });

            data.summary = completion.data.choices[0].text.trim();
            //console.log(serialize(data.content));
        }
    } catch {
        console.log("could not summarise article");
    }

    return data; // Return data to either create or update a document with
}