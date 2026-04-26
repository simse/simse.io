import { actions } from "astro:actions";
import WindowFrame from "@components/computer/WindowFrame.tsx";
import type { WindowProps } from "@components/computer/types.ts";
import { useEffect, useState } from "preact/hooks";

const MAX_MESSAGE_LENGTH = 400;
const MAX_MESSAGE_HISTORY = 30;

interface ChatProps extends WindowProps {}

type Message = {
	message: string;
	sender: "user" | "simon";
	timestamp: Date;
};

const ChatWindow = (props: ChatProps) => {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	//const [chatSessionId, setChatSessionId] = useState<string | null>(null);
	const [isSendingMessage, setSendingMessage] = useState<boolean>(false);
	const [isReceivingMessage, setIsReceivingMessage] = useState<boolean>(false);
	const [isLoadingInitially, setIsLoadingInitially] = useState<boolean>(true);

	// fetch initial chat history
	useEffect(() => {
		actions.getChat().then((response) => {
			if (!response.data) {
				setIsLoadingInitially(false);
				return;
			}

			setMessages(response.data.history);
			//setChatSessionId(response.data.id);
			setIsLoadingInitially(false);
		});
	}, []);

	// helper function to append message to state
	const appendMessage = (message: Message) => {
		setMessages((messages) => {
			return [...messages, message];
		});
	};

	// helper to check if current message can be sent
	const isCurrentMessageValid = (): boolean => {
		if (currentMessage === "" || currentMessage.length > MAX_MESSAGE_LENGTH) {
			return false;
		}

		if (messages.length > MAX_MESSAGE_HISTORY) {
			return false;
		}

		return true;
	};

	const disableSendButton =
		isSendingMessage ||
		isLoadingInitially ||
		isReceivingMessage ||
		!isCurrentMessageValid();

	// @ts-expect-error - to be fixed later
	const handleSend = async (e: SubmitEventHandler<HTMLFormElement>) => {
		e.preventDefault();

		// validate
		if (!isCurrentMessageValid()) {
			return;
		}

		// show sent message in UI immediately
		setSendingMessage(true);
		const messageToSend = currentMessage;
		const messageTimestamp = new Date();
		setCurrentMessage("");

		appendMessage({
			message: messageToSend,
			sender: "user",
			timestamp: messageTimestamp,
		});

		// actually send message
		setIsReceivingMessage(true);

		const response = await actions.sendChatMessage({
			message: messageToSend,
			timestamp: messageTimestamp,
		});

		// append received message to messages array
		setIsReceivingMessage(false);

		if (!response.data) {
			setSendingMessage(false);
			return;
		}

		appendMessage(response.data);

		setSendingMessage(false);
	};

	const clearChat = async () => {
		if (messages.length === 0) {
			return;
		}

		setIsLoadingInitially(true);
		setMessages([]);

		await actions.clearChat();

		setIsLoadingInitially(false);
	};

	const formatDate = (date: Date) => {
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	};

	return (
		<WindowFrame
			title="Chat"
			initialSize={{ width: 500, height: 600 }}
			initialPosition={{ x: 550, y: 20 }}
			{...props}
		>
			<div className="flex flex-col h-full">
				<ul
					class="flex overflow-y-scroll flex-1 flex-col-reverse pr-2
                    scrollbar-thin"
				>
					{isReceivingMessage && <li>Simon is typing...</li>}

					{messages.toReversed().map((message, index) => (
						<li
							// biome-ignore lint/suspicious/noArrayIndexKey: this array won't be reordered
							key={index}
							class={`
							    mb-4 flex flex-col ${message.sender === "user" ? "self-end" : ""} w-3/4
							    
							`}
						>
							<div class="select-none">
								<span class="font-medium mr-4">
									{message.sender === "simon" ? "Simon" : "You"}
								</span>
								<span class="opacity-75">{formatDate(message.timestamp)}</span>
							</div>
							<p class="block border p-2 rounded-sm w-full font-sans-alt">
								{message.message}
							</p>
						</li>
					))}
				</ul>

				<div className="border-t border-dotted pt-2">
					{messages.length >= MAX_MESSAGE_HISTORY ? (
						<div class="py-2 flex justify-between">
							<p>You've reached the message limit.</p>

							<button
								type="button"
								onClick={clearChat}
								className="cursor-pointer active:bg-black active:text-white px-2 border rounded-sm"
							>
								Start new chat
							</button>
						</div>
					) : (
						<>
							<form class="flex gap-2" onSubmit={handleSend}>
								<input
									type="text"
									class="border rounded-sm w-4/5 py-1 px-2 font-sans-alt"
									onInput={(e) => setCurrentMessage(e.currentTarget.value)}
									value={currentMessage}
									maxlength={MAX_MESSAGE_LENGTH}
								/>
								<button
									type="submit"
									disabled={disableSendButton}
									class="flex-1 border rounded-sm active:bg-black active:text-white hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
								>
									Send
								</button>
							</form>

							<div className="flex justify-between">
								<span>
									{currentMessage.length}/{MAX_MESSAGE_LENGTH}
								</span>

								<button
									type="button"
									onClick={clearChat}
									class="cursor-pointer active:bg-black active:text-white px-1"
									disabled={
										isLoadingInitially || isReceivingMessage || isSendingMessage
									}
								>
									x Clear chat
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</WindowFrame>
	);
};

export default ChatWindow;
