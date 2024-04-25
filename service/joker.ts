type Joker = {
    error: boolean,
    category: string,
    type: string,
    setup: string,
    delivery: string,
    joke: string,
    flags: {
        nsfw: boolean,
        religious: boolean,
        political: boolean,
        racist: boolean,
        sexist: boolean,
        explicit: boolean
    },
    id: number,
    safe: boolean,
    lang: string
}

interface JokeBase {
    type: string;
}

interface SingleJoke extends JokeBase {
    type: "single";
    joke: string;
}

interface TwoPartJoke extends JokeBase {
    type: "twopart";
    setup: string;
    delivery: string;
}

type Joke = SingleJoke | TwoPartJoke;

export const jokerLanguage = (lang: string) => {
    switch (lang) {
        case "de": return "de"
        case "es": return "es"
        case "fr": return "fr"
        case "pt-br":
        case "pt": return "pt"
        default: return "en"
    }
}

// Default Messages
export const getDefaultMessage = (lang: string): SingleJoke => ({
    "type": "single",
    "joke": {
        pt: "Meu humor não esta bom hoje.",
        en: "My mood is not good today."
    }[lang] || "My mood is not good today."
});

export const getTiredMessage = (lang: string): SingleJoke => ({
    "type": "single",
    "joke": {
        pt: "Estou cansado de fazer piadas hoje.",
        en: "I'm tired of making jokes today."
    }[lang] || "I'm tired of making jokes today."
});


export const getJoke = async (lang: string): Promise<Joke> => {
    const jokerLang = jokerLanguage(lang)
    const response = await fetch(`https://v2.jokeapi.dev/joke/Any?lang=${jokerLang}`)

    if (response.status == 429) {
        // TODO: Log Joker Rate Limit
        return getTiredMessage(lang)
    }

    if (response.status != 200) {
        // TODO: Log Joker Error
        return getDefaultMessage(lang)
    }

    const data = await response.json() as Joker

    if (data.type == "single") {
        return {
            "type": "single",
            "joke": data.joke,
        }   
    }

    return {
        "type": "twopart",
        "setup": data.setup,
        "delivery": data.delivery,
    }
}