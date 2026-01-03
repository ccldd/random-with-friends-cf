import JoinRoom from "@/components/JoinRoom"
import Room from "@/components/Room"
import { getCloudflareContext } from "@opennextjs/cloudflare"

export default async function Page(props: PageProps<"/rooms/[roomId]">) {
  const { roomId } = await props.params
  const query = await props.searchParams
  const name = query["name"] as string | undefined
  if (!name?.trim()) return <JoinRoom roomId={roomId}></JoinRoom>

  const ctx = await getCloudflareContext({ async: true })
  return (
    <Room
      roomId={roomId}
      name={name}
      partyServerHost={ctx.env.PARTYSERVER_HOST}
    ></Room>
  )
}
