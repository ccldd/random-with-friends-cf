"use client"

import usePartySocket from "partysocket/react"
import { useState, useEffect } from "react"
import { messageSchema, Participant, NewRandomMessage } from "shared"
import { useDrandClient } from "@/lib/useDrandClient"

type RoomProps = {
  roomId: string
  name: string
  partyServerHost: string
}

export default function Room({ roomId, name, partyServerHost }: RoomProps) {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [roundFromOther, setRoundFromOther] = useState<number>()

  const {
    randomness: myRandomness,
    isLoading,
    error,
    fetchRandom,
  } = useDrandClient()
  const { randomness: receivedRandomness } = useDrandClient(roundFromOther)

  const currentRandomness = myRandomness || receivedRandomness

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
        case "NewRandom":
          setRoundFromOther(msg.round)
          break
        default:
          console.error(`Unhandled message ${msg}`)
          break
      }
    },
  })

  useEffect(() => {
    if (myRandomness) {
      const msg = {
        type: "NewRandom",
        round: myRandomness.round,
        connectionId: ws.id,
      } satisfies NewRandomMessage
      ws.send(JSON.stringify(msg))
    }
  }, [myRandomness, ws])

  function handleGenerateRandom() {
    fetchRandom?.()
  }

  return (
    <main>
      Welcome {name} from {roomId}
      <button onClick={handleGenerateRandom} disabled={isLoading}>
        Generate Random!
      </button>
      {error && <div>Error: {error.message}</div>}
      <section id="debug-randomness">
        <h3>Randomness Debug</h3>
        <pre>{JSON.stringify(currentRandomness, null, 2)}</pre>
      </section>
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
