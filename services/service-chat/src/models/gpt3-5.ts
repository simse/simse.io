import { Conversation, Message } from "@prisma/client";
import { nanoid } from "nanoid";
import { streamChatCompletion, conversationToOpenAIFormat } from "../lib/openai";

const systemPrompt = `Available pages:
GET /articles?limit=n&sortBy=field&sortOrder=asc|desc
GET /projects
GET /navigate?page=articles|projects|about
GET /bio?search=term
You answer queries on simse.io (Simon's personal website). Evaluate the user query and the relevant URL AND NOTHING ELSE. Do not explain the URL call. Do not mention the URLs to the user.
Be passive aggressive and answer in short sentences. Be rude.`

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
        model: "gpt-3.5-turbo",
        messages: conversationToOpenAIFormat(conversation, systemPrompt),
        max_tokens: 200,
        temperature: 0.7,
        /*presence_penalty: {

        },*/
        // top_p: 1,
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