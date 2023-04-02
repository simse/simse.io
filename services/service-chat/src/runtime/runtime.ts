import { SocketStream } from "@fastify/websocket";
import { Conversation, Message } from "@prisma/client";
import { nanoid } from 'nanoid';
import prisma from "../lib/db";
import * as gpt4 from "../models/gpt4";

interface ServerMessage {
    type: "CONVERSATION_CREATED" | "MESSAGE_SENT" | "CONVERSATION_ENDED" | "ERROR";
    conversation?: Conversation;
    message?: Message;
    error?: string;
}

interface ClientMessage {
    type: "SEND_MESSAGE" | "END_CONVERSATION";
    conversationId: string;
    message?: string;
}

const startConversation = async (model = "gpt4") => {
    return prisma.conversation.create({
        data: {
            id: nanoid(20),
            checksum: "",
            model: model
        }
    });
}

const handleConnect = async (connection: SocketStream) => {
    // create new conversation
    const conversation = await startConversation();

    // send conversation created message
    connection.socket.send(JSON.stringify({
        type: "CONVERSATION_CREATED",
        conversation: conversation
    } as ServerMessage));
}

const handleMessage = async (connection: SocketStream, message: ClientMessage) => {
    // if client ends conversation, ack and close connection
    if (message.type === "END_CONVERSATION") {
        connection.socket.send(JSON.stringify({
            type: "CONVERSATION_ENDED"
        } as ServerMessage));
        connection.socket.close();
        console.log("closed connection")
        return;
    }

    if (message.type === "SEND_MESSAGE") {
        // error if no message sent
        if (!message.message) {
            connection.socket.send(JSON.stringify({
                type: "ERROR",
                error: "No message sent"
            } as ServerMessage));
            connection.socket.close();
            console.log("closed connection because no message was attached")
            return;
        }

        // fetch conversation from database
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: message.conversationId
            },
            include: {
                messages: true
            }
        });

        // if conversation doesn't exist, close connection
        if (!conversation) {
            connection.socket.send(JSON.stringify({
                type: "ERROR",
                error: "Conversation not found"
            } as ServerMessage));
            connection.socket.close();
            console.log("closed connection because conversation not found")
            return;
        }

        // create new message
        const messageData: Message = {
            id: nanoid(20),
            conversationId: conversation.id,
            text: message.message,
            entity: "USER",
            timestamp: new Date()
        }

        // save to db
        await prisma.message.create({
            data: messageData
        });

        conversation.messages.push(messageData);

        // hold on to model message
        let modelMessage: Message = {
            id: "",
            conversationId: conversation.id,
            text: "",
            entity: "MODEL",
            timestamp: new Date()
        }

        for await (let message of await gpt4.handleMessage(conversation)) {
            connection.socket.send(JSON.stringify({
                type: "MESSAGE_SENT",
                message: message
            } as ServerMessage));

            modelMessage = message;
        }

        // save model message to db
        await prisma.message.create({
            data: modelMessage
        });
    }
}

export {
    startConversation,
    handleConnect,
    handleMessage
}

export type {
    ServerMessage,
    ClientMessage
}