import { useRef, useEffect } from "preact/hooks";
import type { Message, MessageWithContentCards } from "@simse/service-chat/src/types";
import ModelMessage from "./ModelMessage";
import UserMessage from "./UserMessage";

interface MessagesProps {
    messages: (Message | MessageWithContentCards)[];
}

const Messages = ({ messages }: MessagesProps) => {
    const messagesContainer = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesContainer.current?.scrollTo({
            top: messagesContainer.current.scrollHeight,
            behavior: 'smooth'
        });
    }, [messages]);

    return (
        <div ref={messagesContainer} className={`${messages.length > 0 ? 'mb-12' : ''} pr-2 max-h-[30vh] overflow-y-auto scrollbar-thumb-neutral-800 scrollbar-track-neutral-900 scrollbar-thin scrollbar-rounded`}>
            {messages.map((message: Message | MessageWithContentCards) => {
                if (message.entity === "USER") {
                    return <UserMessage key={message.id} message={message} />
                }

                if (message.entity === "MODEL") {
                    return <ModelMessage key={message.id} message={message} />
                }
            })}
        </div>
    )
}

export default Messages;