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

type MessageWithContentCards = Message & { contentCards?: ContentCard[] };

export type {
    Message,
    MessageWithContentCards,
    ContentCard,
    Conversation,
    ServerMessage,
    ClientMessage
}