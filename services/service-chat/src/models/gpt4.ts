import { Conversation, Message } from "@prisma/client";
import { nanoid } from "nanoid";
import { ChatCompletionRequestMessage } from "openai";
import { streamChatCompletion } from "../lib/openai";

const conversationToOpenAIFormat = (conversation: Conversation & { messages: Message[] }): ChatCompletionRequestMessage[] => {
    let messages: ChatCompletionRequestMessage[] = [];

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
        timestamp: new Date()
    }

    for await (let token of streamChatCompletion({
        model: "gpt-4",
        messages: conversationToOpenAIFormat(conversation),
        max_tokens: 20,
        temperature: 0.5,
        top_p: 1,
    })) {
        message.timestamp = new Date();
        message.text += token;
        yield message;
    }
}

export {
    handleMessage
}