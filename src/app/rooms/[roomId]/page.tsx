import Room from "@/components/Room";

type Props = {
  params: { roomId: string }
};

export default async function Page({ params }: Props) {
  var { roomId } = await params
  return <Room roomId={roomId}></Room>
}
