import { z } from "zod"

export const connectedMessageSchema = z.object({
  type: z.literal("connected"),
  connectionId: z.string().nonempty(),
  name: z.string().nonempty(),
})

export const disconnectedMessageSchema = z.object({
  type: z.literal("disconnected"),
  connectionId: z.string().nonempty(),
  name: z.string().nonempty(),
})

export const participantSchema = z.object({
  connectionId: z.string().nonempty(),
  name: z.string().nonempty().nullable(),
})

export const participantsListSchema = z.object({
  type: z.literal("participants"),
  participants: z.array(participantSchema),
})

export const messageSchema = z.discriminatedUnion("type", [
  connectedMessageSchema,
  disconnectedMessageSchema,
  participantsListSchema,
])

export type Message = z.infer<typeof messageSchema>
export type ConnectedMessage = z.infer<typeof connectedMessageSchema>
export type DisconnectedMessage = z.infer<typeof disconnectedMessageSchema>
export type Participant = z.infer<typeof participantSchema>
export type ParticipantsMessage = z.infer<typeof participantsListSchema>
