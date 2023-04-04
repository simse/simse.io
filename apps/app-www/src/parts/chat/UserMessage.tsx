import type { Message } from '@simse/service-chat/src/types';

interface UserMessageProps {
    message: Message;
}

const UserMessage = ({ message }: UserMessageProps) => (
    <div className="flex gap-2 mb-3 text-zinc-400">
        {message.text}
    </div>
)

export default UserMessage;