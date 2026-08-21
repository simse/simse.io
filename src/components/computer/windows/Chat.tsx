import type { WindowProps } from "@components/computer/types.ts";
import WindowFrame from "@components/computer/WindowFrame.tsx";
import { actions } from "astro:actions";
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
    isSendingMessage || isLoadingInitially || isReceivingMessage || !isCurrentMessageValid();

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
      <div className="flex h-full flex-col">
        <ul
          class="flex flex-1 scrollbar-thin flex-col-reverse overflow-y-scroll pr-2"
        >
          {isReceivingMessage && <li>Simon is typing...</li>}

          {messages.toReversed().map((message, index) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: this array won't be reordered
              key={index}
              class={`mb-4 flex flex-col ${message.sender === "user" ? "self-end" : ""} w-3/4`}
            >
              <div class="select-none">
                <span class="mr-4 font-medium">{message.sender === "simon" ? "Simon" : "You"}</span>
                <span class="opacity-75">{formatDate(message.timestamp)}</span>
              </div>
              <p class="font-os-alt block w-full rounded-sm border p-2">{message.message}</p>
            </li>
          ))}
        </ul>

        <div className="border-t border-dotted pt-2">
          {messages.length >= MAX_MESSAGE_HISTORY ? (
            <div class="flex justify-between py-2">
              <p>You've reached the message limit.</p>

              <button
                type="button"
                onClick={clearChat}
                className="cursor-pointer rounded-sm border px-2 active:bg-black active:text-white"
              >
                Start new chat
              </button>
            </div>
          ) : (
            <>
              <form class="flex gap-2" onSubmit={handleSend}>
                <input
                  type="text"
                  class="font-os-alt w-4/5 rounded-sm border px-2 py-1"
                  onInput={(e) => setCurrentMessage(e.currentTarget.value)}
                  value={currentMessage}
                  maxlength={MAX_MESSAGE_LENGTH}
                />
                <button
                  type="submit"
                  disabled={disableSendButton}
                  class="flex-1 rounded-sm border hover:cursor-pointer active:bg-black active:text-white disabled:pointer-events-none disabled:opacity-50"
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
                  class="cursor-pointer px-1 active:bg-black active:text-white"
                  disabled={isLoadingInitially || isReceivingMessage || isSendingMessage}
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
