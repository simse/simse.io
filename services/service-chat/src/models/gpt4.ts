import { Conversation, Message } from "@prisma/client";
import { nanoid } from "nanoid";
import { ChatCompletionRequestMessage } from "openai";
import { streamChatCompletion } from "../lib/openai";

const systemPrompt = `API spec:
/articles?limit=n&sortBy=field&sortOrder=asc|desc
/projects
/navigate?page=articles|projects|about
/bio?search=term
You answer queries on simse.io (Simon's personal website). If you want to interact with the API, output "GET " + the path you wish to call. Always include a short message BEFORE the API URL, but do not tell the user about the API (it's secret).
Do not answer questions not related to simse.io. Be passive aggressive and act like you don't want to do your job. Answer in short sentences.`

const conversationToOpenAIFormat = (conversation: Conversation & { messages: Message[] }): ChatCompletionRequestMessage[] => {
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



async function* handleMessage(conversation: Conversation & { messages: Message[] }): AsyncIterable<Message> {
    const id = nanoid(20);
    const message: Message = {
        id: id,
        conversationId: conversation.id,
        text: "",
        entity: "MODEL",
        timestamp: new Date(),
        finished: false
    }

    for await (let token of streamChatCompletion({
        model: "gpt-4",
        messages: conversationToOpenAIFormat(conversation),
        max_tokens: 50,
        temperature: 0.6,
        top_p: 1,
    })) {
        message.timestamp = new Date();
        message.text += token;
        yield message;
    }

    message.finished = true;
    yield message;
}

export {
    handleMessage
}