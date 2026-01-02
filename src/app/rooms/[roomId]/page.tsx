import JoinRoom from "@/components/JoinRoom"
import Room from "@/components/Room"

type Props = {
  params: { roomId: string }
  searchParams: { name: string }
}

export default async function Page({ params, searchParams }: Props) {
  var { roomId } = await params
  var { name } = await searchParams
  if (!name?.trim()) return <JoinRoom roomId={roomId}></JoinRoom>

  return <Room roomId={roomId} name={name}></Room>
}
