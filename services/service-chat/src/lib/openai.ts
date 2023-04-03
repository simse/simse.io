import {
    OpenAIApi,
    Configuration,
    CreateChatCompletionRequest,
    ChatCompletionRequestMessage
} from 'openai';
import { Conversation, Message } from '@prisma/client';

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
);

async function* streamChatCompletion(request: CreateChatCompletionRequest): AsyncIterable<string> {
    try {
        const response = await openai.createChatCompletion(
            {
                ...request,
                stream: true
            },
            {
                responseType: 'stream',
            },
        )

        // @ts-expect-error - not sure what to do about this
        for await (const chunk of response.data) {
            const lines = chunk
                .toString('utf8')
                .split('\n')
                .filter((line: string) => line.trim().startsWith('data: '));

            for (const line of lines) {
                const message = line.replace(/^data: /, '');
                if (message === '[DONE]') {
                    return
                }

                const json = JSON.parse(message);
                const token = json.choices[0].delta.content;
                
                if (token) {
                    yield token
                }
            }
        }
    } catch (error) {
        console.error(error)
        return
    }


}

const conversationToOpenAIFormat = (conversation: Conversation & { messages: Message[] }, systemPrompt: string): ChatCompletionRequestMessage[] => {
    let messages: ChatCompletionRequestMessage[] = [
        {
            content: systemPrompt,
            role: 'system'
        }
    ];

    conversation.messages.forEach((message: Message) => {
        const role = message.entity === "USER" ? 'user' : 'assistant';

        messages.push({
            content: message.text,
            role: role
        })
    });

    return messages;
}

export {
    streamChatCompletion,
    conversationToOpenAIFormat
}