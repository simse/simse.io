interface Conversation {
    id: string;
    messages: ConversationMessage[];
    model: 'gpt-3.5' | 'gpt-4';
}

interface ConversationMessage {
    id: string;
    entity: 'assistant' | 'user';
    message: string;
    rawMessage: string;
    timestamp: Date;
}

export type {
    Conversation,
    ConversationMessage
}