import type { MessageWithContentCards } from '@simse/service-chat/src/types';
import Card from './Card';
import LoadingCard from './LoadingCard';


interface ModelMessageProps {
    message: MessageWithContentCards;
}

const ModelMessage = ({ message }: ModelMessageProps) => (
    <div className="mb-6 text-xl">
        {message.text}

        {(message.finished && message.contentCards && message.contentCards.length > 0) && message.contentCards?.map(card => <Card key={card.title} card={card} />)}

        {(!message.finished && message.contentCards && message.contentCards.length > 0) && <LoadingCard />}
    </div>
)

export default ModelMessage;