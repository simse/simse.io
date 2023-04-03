import { cleanText } from "./data";

describe('cleanText', () => {
    it('changes nothing when there\'s nothing to clean', () => {
        const text = 'Hello world';
        expect(cleanText(text)).toEqual(text);
    });

    it('removes GET /path', () => {
        const text = 'GET /path';
        expect(cleanText(text)).toEqual('');
    });

    it('removes partial matches', () => {
        const text = 'GET';
        expect(cleanText(text)).toEqual('');

        const text2 = 'GE';
        expect(cleanText(text2)).toEqual('');

        const text3 = 'G';
        expect(cleanText(text3)).toEqual('');
    });

    it('does not remove capital G from unrelated text', () => {
        const text = 'Get out of my way!';
        expect(cleanText(text)).toEqual(text);
    })
});