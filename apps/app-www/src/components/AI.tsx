import { useState, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface Message {
    id: string;
    message: string;
    entity: "user" | "model" | "system" | "overlord";
    cards?: Card[];
    finished: boolean;
}

interface Card {
    title: string;
    body: string;
    url?: string;
    image?: string;
}

interface Conversation {
    messages: Message[];
    model: string;
}

interface UserMessageProps {
    message: Message;
}

// regex for model URL output: (DISPLAY|GET) (\/[a-zA-Z0-9&?=]*)
// regex for partially formed URL output: (D|DI|DIS|DISP|DISPLA|DISPLAY)|(G|GE|GET)


const UserMessage = ({ message }: UserMessageProps) => (
    <div className="flex gap-2 mb-3 text-zinc-400">
        {message.message}
    </div>
)

interface ModelMessageProps {
    message: Message;
}

const ModelMessage = ({ message }: ModelMessageProps) => (
    <div className="mb-6 text-xl">
        {message.message}

        {message.finished && message.cards?.map(card => <Card key={card.title} card={card} />)}

        {(!message.finished && message.cards) && <LoadingCard />}
    </div>
)

interface CardProps {
    card: Card;
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

const AI = () => {
    const messagesContainer = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<string>("");
    const [conversation, setConversation] = useState<Conversation>({
        messages: [
            /*{
                id: "1",
                message: "show me your latest blog posts",
                entity: "user",
                finished: true
            },
            {
                id: "2",
                message: `Sure here it is:`,
                entity: "model",
                finished: false,
                cards: [
                    {
                        title: "GPT-4 is awesome!",
                        body: "GPT-3.5 felt like a huge step forward, GPT-4 takes it to the next level",
                    },
                ]
            },
            {
                id: "1",
                message: "show me your latest blog posts",
                entity: "user",
                finished: true
            },
            {
                id: "2",
                message: `Sure here it is:`,
                entity: "model",
                finished: false,
                cards: [
                    {
                        title: "GPT-4 is awesome!",
                        body: "GPT-3.5 felt like a huge step forward, GPT-4 takes it to the next level",
                    },
                ]
            },
            {
                id: "1",
                message: "show me your latest blog posts",
                entity: "user",
                finished: true
            },
            {
                id: "2",
                message: `Sure here it is:`,
                entity: "model",
                finished: false,
                cards: [
                    {
                        title: "GPT-4 is awesome!",
                        body: "GPT-3.5 felt like a huge step forward, GPT-4 takes it to the next level",
                    },
                ]
            },*/
        ],
        model: "gpt-4"
    });

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket('ws://localhost:8080/chat', {}, true);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            const message = lastJsonMessage as unknown as Message;
            if (message.entity === 'overlord') return;

            // check if message with id already exists, if so replace it
            const existingMessage = conversation.messages.find(m => m.id === message.id);
            if (existingMessage) {
                const messages = conversation.messages.map(m => {
                    if (m.id === message.id) {
                        return message;
                    }

                    return m;
                });

                setConversation({
                    ...conversation,
                    messages
                });
            }

            // otherwise add it to the conversation
            else {
                setConversation({
                    ...conversation,
                    messages: [
                        ...conversation.messages,
                        message
                    ]
                });
            }
        }
      }, [lastJsonMessage, setConversation]);

    useEffect(() => {
        messagesContainer.current?.scrollTo({
            top: messagesContainer.current.scrollHeight,
            behavior: 'smooth'
        })
    }, [conversation]);

    const submitMessage = () => {
        if (query === "") {
            return;
        }

        setConversation({
            ...conversation,
            messages: [
                ...conversation.messages,
                {
                    id: (conversation.messages.length + 1).toString(),
                    message: query,
                    entity: "user",
                    finished: true
                }
            ]
        });

        sendJsonMessage({
            id: (conversation.messages.length + 1).toString(),
            message: query,
        });

        setQuery("");
    }

    const connectionMessage = (): string => {
        if (readyState === ReadyState.CONNECTING) {
            return "Connecting to GPT-4...";
        }

        if (readyState === ReadyState.OPEN) {
            return "Connected to GPT-4";
        }

        return "Disconnected";
    }

    const connectionColour = (): string => {
        if (readyState === ReadyState.CONNECTING) {
            return "bg-yellow-600";
        }

        if (readyState === ReadyState.OPEN) {
            return "bg-green-600";
        }

        return "bg-red-600";
    }

    return (
        <div>
            <div ref={messagesContainer} className="pr-2 max-h-[30vh] overflow-y-auto scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 scrollbar-thin scrollbar-rounded">
                {conversation.messages.map((message, i) => {
                    if (message.entity === "user") {
                        return <UserMessage key={message.id} message={message} />
                    }

                    if (message.entity === "model") {
                        return <ModelMessage key={message.id} message={message} />
                    }
                })}
            </div>

            <div className={`flex gap-1 w-full ${conversation.messages.length > 0 ? 'mt-12' : ''}`}>
                <input 
                    className="bg-zinc-900 py-3 px-4 text-xl w-5/6 active:outline outline-2 outline-blue-600 border-0" 
                    type="text" 
                    placeholder={conversation.messages.length === 0 ? "What are you looking for?" : "Type your message..."}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} />

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