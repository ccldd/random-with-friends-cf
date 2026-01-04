"use client"

import usePartySocket from "partysocket/react"
import { useState } from "react"
import { messageSchema, Participant } from "shared"

type RoomProps = {
  roomId: string
  name: string
  partyServerHost: string
}

export default function Room({ roomId, name, partyServerHost }: RoomProps) {
  const [participants, setParticipants] = useState<Participant[]>([])
  const ws = usePartySocket({
    host: partyServerHost,
    party: "room-server",
    room: roomId,
    query: { name: name },
    debug: process.env.NEXTJS_ENV == "development",
    onMessage(e: MessageEvent<string>) {
      console.log(e.data)
      const msg = messageSchema.parse(JSON.parse(e.data))
      switch (msg.type) {
        case "connected":
          setParticipants([...participants, { ...msg }])
          break
        case "disconnected":
          setParticipants([
            ...participants.filter((x) => x.connectionId != msg.connectionId),
          ])
          break
        case "participants":
          setParticipants(msg.participants)
          break
        default:
          console.error(`Unhandled message ${msg}`)
          break
      }
    },
  })

  return (
    <main>
      Welcome {name} from {roomId}
      <section id="participants">
        <ul>
          {participants.map((p) => (
            <li key={p.connectionId}>{p.name}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
