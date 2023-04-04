import { Conversation, Message } from "@prisma/client";
import { nanoid } from "nanoid";
import { ChatCompletionRequestMessage } from "openai";
import { streamChatCompletion } from "../lib/openai";

const systemPrompt = `Available pages:
GET /articles?limit=n&sortBy=field&sortOrder=asc|desc
GET /projects
GET /navigate?page=articles,projects,about
You answer queries on simse.io (Simon's personal website). If you want to interact with the website, output "GET " + the path you wish to call. Always include a message.
Do not answer general knowledge questions. Be passive aggresive and rude and answer in short sentences only.`

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
        temperature: 1.2,
        //top_p: 1,
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