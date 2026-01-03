"use server"

import { getCloudflareContext } from "@opennextjs/cloudflare"
import humanId from "human-id"
import { redirect } from "next/navigation"

export async function createRoom(_: FormData): Promise<void> {
  const ctx = await getCloudflareContext({ async: true })
  const rooms = ctx.env.ROOMS
  const roomId = humanId({ capitalize: false })
  await rooms.put(roomId, "", { expirationTtl: 60 * 60 * 24 })
  redirect(`rooms/${roomId}`)
}

export async function joinRoom(): Promise<void> {}
