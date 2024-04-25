import { NextRequest, NextResponse } from "next/server"
const apiKey = process.env.SERVER_API_KEY

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

const jokerDefault = {
  pt: "Meu humor não esta bom hoje.",
  en: "My mood is not good today."
}

const jokerTired = {
  pt: "Estou cansado de fazer piadas hoje.",
  en: "I'm tired of making jokes today."
}

export async function POST(req: NextRequest, res: NextResponse) {
  if (apiKey !== req.headers.get("x-api-key")) {
    return Response.json("Not authorized", { status: 401 })
  }
  const body = await req.json()

  console.log(body)
  let { context: { user: { lang }}} = body


  // Default value
  lang = lang ? lang : 'en'

  // Validate Language
  if (!['pt', 'en'].includes(lang)) {
    return Response.json("Language not supported. Must be ['en', 'pt']", { status: 422 })
  }

  const response = await fetch(`https://v2.jokeapi.dev/joke/Any?lang=${lang}`)

  if (response.status == 429) {
    // TODO: Log Joker Ratelimit Api

    return Response.json({
      responses: [],
      output: {
        joke: {
          "type": "single",
          "joke": jokerTired.pt,
        }
      }
    }, { status: 200 })
  }

  if (response.status != 200) {
    // TODO: Log Joker Error

    return Response.json({
      responses: [],
      output: {
        joke: {
          "type": "single",
          "joke": jokerDefault.pt,
        }
      }
    }, { status: 200 })
  }

  const data = await response.json() as Joker

  return Response.json({
    responses: [],
    output: {
      joke: {
        "type": data.type,
        "joke": data.joke,
        "setup": data.setup,
        "delivery": data.delivery,
      }
    }
  }, { status: 200 })
}

