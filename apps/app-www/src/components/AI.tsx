import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface Message {
    id: string;
    message: string;
    entity: "user" | "model" | "system" | "overlord";
}

interface Conversation {
    messages: Message[];
    model: string;
}

interface UserMessageProps {
    message: string;
}

// regex for model URL output: (DISPLAY|GET) (\/[a-zA-Z0-9&?=]*)
// regex for partially formed URL output: (D|DI|DIS|DISP|DISPLA|DISPLAY)|(G|GE|GET)


const UserMessage = ({ message }: UserMessageProps) => (
    <div className="flex gap-2 mb-3 text-zinc-400">
        {message}
    </div>
)

interface ModelMessageProps {
    message: string;
}

const ModelMessage = ({ message }: ModelMessageProps) => (
    <div className="flex gap-2 mb-6 text-xl">
        {message}
    </div>
)

const AI = () => {
    const [query, setQuery] = useState<string>("");
    const [conversation, setConversation] = useState<Conversation>({
        messages: [
            /*{
                id: "1",
                message: "show me your latest blog posts",
                entity: "user"
            },
            {
                id: "2",
                message: `Sure here it is: {"url":"/articles?limit=1\u0026sortBy=createdAt\u0026sortOrder=desc","error":false,"error_message":"","response":"[{\"id\":\"641ca6f45968ef2883da720e\",\"title\":\"The mother of all kitchen sinks\",\"published_at\":\"2023-03-23T19:23:05.005Z\",\"categories\":\"Cool Tech\"}]"}`,
                entity: "model"
            }*/
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
                    entity: "user"
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
            <div className="max-h-[50vh] overflow-y-auto ">
                {conversation.messages.map((message, i) => {
                    if (message.entity === "user") {
                        return <UserMessage key={message.id} message={message.message} />
                    }

                    if (message.entity === "model") {
                        return <ModelMessage key={message.id} message={message.message} />
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