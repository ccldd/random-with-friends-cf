import { redirect } from "next/navigation"

export default async function JoinRoom({ roomId }: { roomId: string }) {
  async function submit(formdata: FormData) {
    "use server"
    const name = formdata.get("name")
    redirect(`/rooms/${roomId}?name=${name}`)
  }

  return (
    <form action={submit}>
      <input
        name="name"
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
}
