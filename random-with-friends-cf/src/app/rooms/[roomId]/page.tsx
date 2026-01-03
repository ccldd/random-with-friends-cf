import JoinRoom from "@/components/JoinRoom"
import Room from "@/components/Room"
import { getCloudflareContext } from "@opennextjs/cloudflare"

type Props = {
  params: { roomId: string }
  searchParams: { name: string }
}

export default async function Page({ params, searchParams }: Props) {
  const { roomId } = await params
  const { name } = await searchParams
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
