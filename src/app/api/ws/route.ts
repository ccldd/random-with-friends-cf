import RoomServer from "@/lib/RoomServer"
import { getCloudflareContext } from "@opennextjs/cloudflare"
import { NextRequest } from "next/server"
import { routePartykitRequest } from "partyserver"

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name")
  if (!name) return new Response(null, { status: 400 })

  const ctx = await getCloudflareContext({ async: true })
  return await routePartykitRequest(req, ctx.env as Cloudflare.Env)
}
