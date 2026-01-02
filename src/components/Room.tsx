"use client"

import usePartySocket from "partysocket/react"
import { useRef, useState } from "react"

type RoomProps = {
  roomId: string
  name: string
}

export default function Room({ roomId, name }: RoomProps) {
  const ws = usePartySocket({ room: roomId })

  return (
    <main>
      Welcome {name} from {roomId}
      <section id="participants"></section>
    </main>
  )
}
