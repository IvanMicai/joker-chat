import { NextRequest, NextResponse } from "next/server"
import { buffer } from 'micro';
import { getJoke } from "@/service/joker"
import { validateSignature } from "@/service/moveo"

export async function POST(req: NextRequest, res: NextResponse) {
  // Get request data
  const signature = req.headers.get("x-moveo-signature")
  const rawBody = await req.text()
  const { context: { user: { lang }}} = JSON.parse(rawBody)

  // Check Webhook signature
  if (!validateSignature(rawBody, signature)) {
    return Response.json("Not authorized", { status: 401 })
  }

  // Get Joke
  const joke = await getJoke(lang)
  
  return Response.json({
    responses: [],
    output: { joke }
  }, { status: 200 })
}

