import { useEffect, useState } from "preact/hooks";
import Sockette from "sockette";
import type { Conversation, Message, ServerMessage, ClientMessage, MessageWithContentCards } from "@simse/service-chat/src/types";
import Input from "./Input";
import Status, { ConnectionStatus } from "./Status";
import Messages from "./Messages";

const Chat = () => {
    const [connection, setConnection] = useState<Sockette>();
    const [conversation, setConversation] = useState<Conversation>();
    const [messages, setMessages] = useState<(Message | MessageWithContentCards)[]>([]);
    const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.CONNECTING);
    const [lastServerMessage, setLastServerMessage] = useState<ServerMessage>();
    const [serviceChatUrl, setServiceChatUrl] = useState<string>();

    useEffect(() => {
        if(!serviceChatUrl) {
            fetch("/api/chatUrl")
                .then((response) => response.json())
                .then((data) => {
                    setServiceChatUrl(data.url);
                });
            return;
        }

        setConnection(new Sockette(serviceChatUrl, {
            // timeout: 10e3,
            maxAttempts: 10,
            onopen: (e: Event) => {
                setStatus(ConnectionStatus.CONNECTED);
            },
            onmessage: (event: MessageEvent) => {
                const serverMessage = JSON.parse(event.data) as unknown as ServerMessage;
                setLastServerMessage(serverMessage);
            },
            onreconnect: (e: Event) => {
                setStatus(ConnectionStatus.CONNECTING);
            },
            onmaximum: (e: Event) => {
                setStatus(ConnectionStatus.DISCONNECTED);
            },
            onclose: (e: CloseEvent) => {
                setStatus(ConnectionStatus.DISCONNECTED);
            },
            onerror: (e: Event) => {
                setStatus(ConnectionStatus.DISCONNECTED);
            }
        }));

        return () => connection?.close();
    }, [serviceChatUrl]);

    useEffect(() => {
        if (!lastServerMessage) {
            return;
        }

        switch (lastServerMessage.type) {
            case "CONVERSATION_CREATED":
                setConversation(lastServerMessage.conversation);
                setStatus(ConnectionStatus.CONNECTED);
                break;

            case "MESSAGE_SENT":
                const existingMessage = messages.find((m: Message | MessageWithContentCards) => m.id === lastServerMessage.message?.id);

                if (existingMessage) {
                    setMessages(messages.map((m: Message | MessageWithContentCards) => {
                        if (m.id === lastServerMessage.message?.id) {
                            return lastServerMessage.message as MessageWithContentCards;
                        }

                        return m;
                    }));
                } else {
                    setMessages([
                        ...messages,
                        lastServerMessage.message as MessageWithContentCards
                    ]);
                }
                break;
        }
    }, [lastServerMessage]);

    const submitMessage = (query: string) => {
        if (query === "" || !query || !conversation?.id) {
            return;
        }

        setMessages([
            ...messages,
            {
                conversationId: conversation?.id,
                id: (Math.random() * 100000000000000000).toString(),
                text: query,
                entity: "USER",
                timestamp: new Date(),
                finished: true
            }
        ]);

        const message: ClientMessage = {
            conversationId: conversation?.id,
            message: query,
            type: "SEND_MESSAGE"
        }

        connection?.send(JSON.stringify(message));
    }

    return (
        <div>
            <Messages messages={messages} />

            <Input placeholder="Type your message" disabled={status !== ConnectionStatus.CONNECTED} onSubmit={submitMessage} />

            <Status status={status} />
        </div>
    );
};

export default Chat;