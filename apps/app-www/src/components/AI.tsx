import { useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import type { ClientMessage, ServerMessage, Message, ContentCard, Conversation } from '@simse/service-chat/src/types';

interface ConversationWithMessages extends Conversation {
    messages: Message[];
}

interface UserMessageProps {
    message: Message;
}

const UserMessage = ({ message }: UserMessageProps) => (
    <div className="flex gap-2 mb-3 text-zinc-400">
        {message.text}
    </div>
)

interface ModelMessageProps {
    message: Message & { cards?: ContentCard[] }
}

const ModelMessage = ({ message }: ModelMessageProps) => (
    <div className="mb-6 text-xl">
        {message.text}

        {/*message.finished && message.cards?.map(card => <Card key={card.title} card={card} />)*/}

        {(true && message.cards) && <LoadingCard />}
    </div>
)

interface CardProps {
    card: ContentCard;
}

const Card = ({ card }: CardProps) => (
    <div className="mt-3 bg-neutral-900 text-base px-4 py-3">
        <h2 className="font-bold mb-2 text-lg">{card.title}</h2>
        <p>{card.body}</p>
    </div>
)

const LoadingCard = () => (
    <div className="mt-3 bg-neutral-900 text-neutral-300 text-base px-4 py-3">
        Loading data...
    </div>
)

enum ConnectionStatus {
    CONNECTING = "Connecting...",
    CONNECTED = "Connected",
    DISCONNECTED = "Disconnected"
}

const AI = () => {
    const messagesContainer = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<string>("");
    const [conversation, setConversation] = useState<Conversation>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.CONNECTING);

    const { sendMessage, lastJsonMessage, readyState } = useWebSocket(import.meta.env.PUBLIC_SERVICE_CHAT_URL || '', {}, true);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            const serverMessage = lastJsonMessage as unknown as ServerMessage;

            //console.log(serverMessage);
            
            switch(serverMessage.type) {
                case "CONVERSATION_CREATED":
                    setConversation(serverMessage.conversation);
                    setStatus(ConnectionStatus.CONNECTED);
                    break;
                    
                case "MESSAGE_SENT":
                    const existingMessage = messages.find(m => m.id === serverMessage.message?.id);

                    if (existingMessage) {
                        setMessages(messages.map(m => {
                            if (m.id === serverMessage.message?.id) {
                                return serverMessage.message;
                            }

                            return m;
                        }));
                    } else {
                        setMessages([
                            ...messages,
                            serverMessage.message as Message
                        ]);
                    }
                    break;
            }
        }
      }, [lastJsonMessage, setConversation]);

    useEffect(() => {
        messagesContainer.current?.scrollTo({
            top: messagesContainer.current.scrollHeight,
            behavior: 'smooth'
        })
    }, [conversation]);

    useEffect(() => {
        if (readyState === ReadyState.CLOSED) {
            setStatus(ConnectionStatus.DISCONNECTED);
        } else {
            setStatus(ConnectionStatus.CONNECTING);
        }
    }, [readyState]);

    const submitMessage = () => {
        if (query === "") {
            return;
        }

        setMessages([
            ...messages,
            {
                conversationId: conversation?.id || "ddd",
                id: (Math.random() * 100000000000000000).toString(),
                text: query,
                entity: "USER",
                timestamp: new Date()
            }
        ]);

        const message: ClientMessage = {
            conversationId: conversation?.id || "ddd",
            message: query,
            type: "SEND_MESSAGE"
        }

        sendMessage(JSON.stringify(message));

        setQuery("");
    }

    const connectionMessage = (): string => {
        if (status === ConnectionStatus.CONNECTING) {
            return "Connecting to GPT-4...";
        }

        if (status === ConnectionStatus.CONNECTED) {
            return "Connected to GPT-4";
        }

        return "Disconnected";
    }

    const connectionColour = (): string => {
        if (status === ConnectionStatus.CONNECTING) {
            return "bg-yellow-600";
        }

        if (status === ConnectionStatus.CONNECTED) {
            return "bg-green-600";
        }

        return "bg-red-600";
    }

    return (
        <div>
            <div ref={messagesContainer} className="pr-2 max-h-[30vh] overflow-y-auto scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 scrollbar-thin scrollbar-rounded">
                {messages.map((message, i) => {
                    if (message.entity === "USER") {
                        return <UserMessage key={message.id} message={message} />
                    }

                    if (message.entity === "MODEL") {
                        return <ModelMessage key={message.id} message={message} />
                    }
                })}
            </div>

            <div className={`flex gap-1 w-full ${messages.length > 0 ? 'mt-12' : ''}`}>
                <input
                    className="bg-zinc-900 py-3 px-4 text-xl w-5/6 active:outline outline-2 outline-blue-600 border-0"
                    type="text"
                    placeholder={messages.length === 0 ? "What are you looking for?" : "Type your message..."}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.code === "Enter" ? submitMessage() : null} />

                <button
                    className="bg-blue-600 w-1/6 disabled:bg-zinc-700 disabled:hover:cursor-not-allowed"
                    disabled={readyState !== ReadyState.OPEN}
                    onClick={submitMessage}>Send</button>
            </div>

            <div className="py-4 flex gap-2 items-center">
                <div className={`h-2 w-2 ${connectionColour()} rounded-full`}></div>

                <p className="text-zinc-400">{connectionMessage()}</p>
            </div>
        </div>
    );
};

export default AI;