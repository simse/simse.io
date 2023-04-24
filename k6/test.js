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
    http.get('https://simse.dev');
    sleep(1);
    http.get('https://simse.dev/posts');
    sleep(1);
    http.get('https://simse.dev/posts/rebuilding-my-personal-website-is-my-vice');
    sleep(1);
}