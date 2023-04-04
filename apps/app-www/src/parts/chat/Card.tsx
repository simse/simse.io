import type { ContentCard } from '@simse/service-chat/src/types';

interface CardProps {
    card: ContentCard;
}

const Card = ({ card }: CardProps) => (
    <div className="mt-3 bg-neutral-900 text-base flex items-center mb-2">
        {card.image && <div >
            {/*<img style={{height: 100, width: 200}} src={`https://imagedelivery.net/momKfEj2XLFFfTO94YnvIg/${card.image}/w=200,h=100,format=auto,fit=cover`} alt={card.title} />*/}
        </div>}

        <div className="px-4 py-3">
            <h2 className="text-lg font-bold">{card.title}</h2>
            <p>{card.body}</p>
        </div>
    </div>
)

export default Card;