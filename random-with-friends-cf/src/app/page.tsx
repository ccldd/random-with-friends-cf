import { createRoom } from "@/lib/actions"

export default function Home() {
  return (
    <main>
      <form action={createRoom}>
        <button>Create Room</button>
      </form>
    </main>
  )
}
