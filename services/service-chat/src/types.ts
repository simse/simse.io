import type { Message, Conversation } from "@prisma/client";
import type { ServerMessage, ClientMessage } from "./runtime/runtime";

interface ContentCard {
    id: string;
    title: string;
    body: string;
    tags?: string[];
    image?: string;
    link?: string;
}

export type {
    Message,
    ContentCard,
    Conversation,
    ServerMessage,
    ClientMessage
}