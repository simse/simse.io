import axios from 'axios';
import { Message } from "@prisma/client";
import type { ContentCard } from "../types";


const parseMessage = async (message: Message): Promise<Message & { contentCards: ContentCard[] }> => {
    let contentCards: ContentCard[] = [];
    
    // find fully formed API requests
    const re = /GET (\/[a-zA-Z0-9&?=_-]*)/;

    const matches = re.exec(message.text);
    if (matches) {
        // replace match with nothing
        // message.text = message.text.replace(matches[0], '');

        if (!message.finished) {
            contentCards.push({
                id: 'loading',
                title: 'Loading data...',
                body: '',
            })
        } else {
            const path = matches[1];
            const url = `http://localhost:3000/api${path}`;
            const response = await axios.get(url);

            if (response.status !== 200) {
                contentCards.push({
                    id: 'error',
                    title: 'Error',
                    body: 'There was an error fetching data',
                })
            } else if (response.data) {
                // ensure it's valid JSON
                try {
                    // JSON.stringify(response.data);
                    contentCards = response.data;
                } catch (e) {
                    contentCards.push({
                        id: 'error',
                        title: 'Error',
                        body: 'There was an error parsing the data',
                    })
                }
            }
        }
        /*console.log(matches[0 ])
        console.log(message.text)*/
    }

    return {
        ...message,
        contentCards: contentCards
    }
}

const cleanText = (text: string): string => {
    let re = /GET (\/[a-zA-Z0-9&?=_-]*)/;

    const matches = re.exec(text);
    if (matches) {
        return text.replace(matches[0], '');
    }

    // try removing partial matches
    const endOfStringToken = '|';

    const partialMatcher = /(GET \||GET\||GE\||G\|)/;

    const partialMatches = partialMatcher.exec(text+endOfStringToken);
    if (partialMatches) {
        text += endOfStringToken;
        text = text.replace(partialMatches[0], '');
        text = text.replace(endOfStringToken, '');

        return text;
    }

    return text;
}

export {
    parseMessage,
    cleanText
}