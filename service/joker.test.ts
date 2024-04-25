import { getJoke, jokerLanguage, getDefaultMessage, getTiredMessage } from './joker';
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

describe('Joker Functions', () => {
    beforeEach(() => {
        fetchMock.doMock(); // Reset fetch mock before each test
    });

    it('should return the correct language code', () => {
        expect(jokerLanguage("de")).toEqual("de");
        expect(jokerLanguage("es")).toEqual("es");
        expect(jokerLanguage("fr")).toEqual("fr");
        expect(jokerLanguage("pt-br")).toEqual("pt");
        expect(jokerLanguage("pt")).toEqual("pt");
        expect(jokerLanguage("unknown")).toEqual("en"); // Default to English
    });

    it('should return default message in specified language', () => {
        expect(getDefaultMessage("pt").joke).toEqual("Meu humor não esta bom hoje.");
        expect(getDefaultMessage("en").joke).toEqual("My mood is not good today.");
    });

    it('should handle rate limit by returning tired message', async () => {
        fetchMock.mockResponseOnce('', { status: 429 });
        const joke = await getJoke('en');
        expect(joke).toEqual(getTiredMessage('en'));
    });

    it('should handle network errors by returning default message', async () => {
        fetchMock.mockResponseOnce('', { status: 500 });
        const joke = await getJoke('en');
        expect(joke).toEqual(getDefaultMessage('en'));
    });

    it('should handle single joke type correctly', async () => {
        const mockJoke = {
            error: false,
            type: "single",
            joke: "Why did the chicken cross the road?",
        };
        fetchMock.mockResponseOnce(JSON.stringify(mockJoke), { status: 200 });
        const joke = await getJoke('en');
        expect(joke).toEqual({ type: "single", joke: "Why did the chicken cross the road?" });
    });

    it('should handle twopart joke type correctly', async () => {
        const mockJoke = {
            error: false,
            type: "twopart",
            setup: "What's the best thing about Switzerland?",
            delivery: "I don't know, but the flag is a big plus."
        };
        fetchMock.mockResponseOnce(JSON.stringify(mockJoke), { status: 200 });
        const joke = await getJoke('en');
        expect(joke).toEqual({
            type: "twopart",
            setup: "What's the best thing about Switzerland?",
            delivery: "I don't know, but the flag is a big plus."
        });
    });
});