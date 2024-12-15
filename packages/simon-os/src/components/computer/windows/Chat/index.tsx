import { useState, useRef, useEffect } from "preact/hooks";

import WindowFrame from "../../WindowFrame";
import type { WindowProps } from "../../types";

interface ChatWindowProps extends WindowProps {}

const ChatWindow = (props: ChatWindowProps) => {
	const [messages, setMessages] = useState<
		{
			timestamp: string;
			content: string;
			role: "user" | "assistant";
		}[]
	>([
		/*{
			role: "assistant",
			content: "Hey! Have you heard about this thing called 'The Internet'?",
			timestamp: "now",
		},
        {
			role: "assistant",
			content: "Hey! Have you heard about this thing called 'The Internet'?",
			timestamp: "now",
		},
        {
			role: "assistant",
			content: "Hey! Have you heard about this thing called 'The Internet'?",
			timestamp: "now",
		},
        {
			role: "assistant",
			content: "Hey! Have you heard about this thing called 'The Internet'?",
			timestamp: "now",
		},
        {
			role: "assistant",
			content: "Hey! Have you heard about this thing called 'The Internet'?",
			timestamp: "now",
		},
        {
			role: "assistant",
			content: "Hey! Have you heard about this thing called 'The Internet'?",
			timestamp: "now",
		},
        {
			role: "assistant",
			content: "Hey! Have you heard about this thing called 'The Internet'?",
			timestamp: "now",
		},
        {
			role: "assistant",
			content: "Hey! Have you heard about this thing called 'The Internet'?",
			timestamp: "now",
		},
        {
			role: "assistant",
			content: "Hey! Have you heard about this thing called 'The Internet'?",
			timestamp: "now",
		},
        {
			role: "assistant",
			content: "Hey! Have you heard about this thing called 'The Internet'?",
			timestamp: "now",
		},*/
	]);
	const [canSend, setCanSend] = useState(true);
	const [currentMessage, setCurrentMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesRef = useRef<HTMLUListElement | null>(null)

    const scrollToBottom = () => {
        if (messagesRef) {
            messagesRef.current?.scroll({
                top: messagesRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }

    const handleSubmit = async () => {
        setCanSend(false)
        setIsTyping(true)
        setCurrentMessage("")
        const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify([
                ...messages,
                {
                    role: 'user',
                    content: currentMessage,
                    timestamp: new Date().toISOString(),
                }
            ])
        });

        const parsedResp = await response.json() as {
			timestamp: string;
			content: string;
			role: "user" | "assistant";
		}[];

        setIsTyping(false);
        setMessages(parsedResp);
        scrollToBottom();
        setCanSend(true);
    }

	return (
		<WindowFrame
			title="Chat"
			initialSize={{ width: 400, height: 500 }}
			initialPosition={{ x: 300, y: 50 }}
			{...props}
		>
			<div class="flex flex-col h-full">
				<ul class="flex-1 overflow-y-auto" ref={messagesRef}>
                    {messages.map(message => (
                        <li key={message.timestamp} class="mb-4">
                            <span>{message.role === 'user' ? 'You' : 'Simon'}</span>
                            <span class="font-sans-alt text-xs leading-5 block">{message.content}</span>
                        </li>
                    ))}
                    {isTyping ? (
                        <li key="status">Simon is typing...</li>
                    ) : null}
                </ul>

				<form
					class="border-t border-black/60 pt-2 mt-2 flex items-center"
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<input
						type="text"
						class="border border-black/60 rounded flex-1 px-2"
						placeholder="Enter your message here..."
						disabled={!canSend}
						value={currentMessage}
						onInput={(e) => setCurrentMessage(e.currentTarget.value)}
					/>
					<button
						type="submit"
						class="px-4 mx-2 rounded active:bg-black/20 disabled:pointer-events-none border border-black/60"
						disabled={!canSend}
					>
						Send
					</button>
				</form>
			</div>
		</WindowFrame>
	);
};

export default ChatWindow;
