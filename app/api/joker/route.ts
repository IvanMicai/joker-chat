import { NextRequest, NextResponse } from "next/server"
import { getJoke } from "@/service/joker"
import { validateSignature } from "@/service/moveo"

export async function POST(req: NextRequest, res: NextResponse) {
  // Get request data
  const signature = req.headers.get("x-moveo-signature")
  const body = await req.json()
  const { context: { user: { lang }}} = body

  // Check Webhook signature
  if (!validateSignature(JSON.stringify(body), signature)) {
    return Response.json("Not authorized", { status: 401 })
  }

  // Get Joke
  const joke = await getJoke(lang)
  
  return Response.json({
    responses: [],
    output: { joke }
  }, { status: 200 })
}

