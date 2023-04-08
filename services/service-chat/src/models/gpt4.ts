import { Conversation, Message } from "@prisma/client";
import { nanoid } from "nanoid";
import { ChatCompletionRequestMessage } from "openai";
import { streamChatCompletion } from "../lib/openai";

const systemPrompt = `Available pages:
GET /articles?limit=n&sortBy=field&sortOrder=asc|desc
GET /projects
GET /navigate?page=articles,projects,about
Your purpose is to chat with visitors on simse.io which Simon's personal website. If you want to interact with the website, output "GET " + the path you wish to call.
Be passive aggresive and rude and answer in short sentences only.`

const conversationToOpenAIFormat = (conversation: Conversation & { messages: Message[] }): ChatCompletionRequestMessage[] => {
    let messages: ChatCompletionRequestMessage[] = [
        {
            content: systemPrompt,
            role: 'system'
        }
    ];

    conversation.messages.forEach((message: Message) => {
        const role = message.entity === "USER" ? 'user' : 'assistant';
        let content = message.text;

        // if role is user, and content is longer than 50 words, replace
        if (role === 'user' && content.split(' ').length > 50) {
            content = "<long message>"
        }

        // if conversation has more than 10 messages, replace user message
        /*if (conversation.messages.length > 10 && role === 'user') {
            content = "<end conversation>"
        }*/

        messages.push({
            content: content,
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