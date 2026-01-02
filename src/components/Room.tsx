"use client"

import { useRef, useState } from "react"

type RoomProps = {
  roomId: string
}

export default function Room({ roomId }: RoomProps) {
  const [name, setName] = useState<string>()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setName(inputRef.current?.value)
  }

  if (!name)
    return (
      <form onSubmit={handleOnSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your name"
          required
          pattern="[A-Za-z]+"
          title="Invalid name"
          maxLength={50}
        ></input>
        <button>OK</button>
      </form>
    )

  return (
    <main>
      Welcome {name} from {roomId}
    </main>
  )
}
