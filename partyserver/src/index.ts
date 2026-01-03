import {
	Connection,
	ConnectionContext,
	routePartykitRequest,
	Server,
} from "partyserver"
import {
	ConnectedMessage,
	DisconnectedMessage,
	ParticipantsMessage,
} from "../../shared/messages"

// Define your Server
export class RoomServer extends Server {
	static options = {
		hibernate: true,
	}

	// connectionId -> name
	names: Map<string, string> = new Map<string, string>()

	onConnect(connection: Connection, ctx: ConnectionContext) {
		const url = URL.parse(ctx.request.url)
		const name = url?.searchParams.get("name")
		if (!name) {
			connection.close(400, "missing name")
			return
		}
		this.names.set(connection.id, name)

		// Tell others that someone has joined
		const connectedMsg = {
			type: "connected",
			connectionId: connection.id,
			name: name,
		} satisfies ConnectedMessage
		this.broadcast(JSON.stringify(connectedMsg), [connection.id])

		console.log("connected ", {
			name: name,
			connectionId: connection.id,
			room: this.name,
		})

		// Tell the new person the current participants
		const participantsMsg = {
			type: "participants",
			participants: [...this.names].map(([connectionId, name]) => ({
				connectionId,
				name,
			})),
		} satisfies ParticipantsMessage
		connection.send(JSON.stringify(participantsMsg))
	}

	onMessage(connection: Connection, message: string) {
		this.broadcast(message, [connection.id])

		console.log("message received ", {
			sender: {
				connectionId: connection.id,
				name: this.names.get(connection.id),
			},
			msg: JSON.parse(message),
			room: this.name,
		})
	}

	onClose(connection: Connection): void | Promise<void> {
		console.log([...this.names])
		const name = this.names.get(connection.id)
		this.names.delete(connection.id)

		const msg = {
			type: "disconnected",
			connectionId: connection.id,
			name: name!,
		} satisfies DisconnectedMessage
		this.broadcast(JSON.stringify(msg), [connection.id])

		console.log("disconnected ", {
			name: name,
			connectionId: connection.id,
			room: this.name,
		})
	}
}

export default {
	// Set up your fetch handler to use configured Servers
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routePartykitRequest(request, env)) ||
			new Response("Not Found", { status: 404 })
		)
	},
} satisfies ExportedHandler<Env>
