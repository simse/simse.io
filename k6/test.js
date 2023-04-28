import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 200 },
        { duration: '1m', target: 2000 },
        { duration: '20s', target: 0 },
    ],
};

export default function () {
    http.get('https://simse.io');
    sleep(1);
    http.get('https://simse.io/posts');
    sleep(1);
    http.get('https://simse.io/posts/using-gpt-4-to-write-better-articles');
    sleep(1);
}