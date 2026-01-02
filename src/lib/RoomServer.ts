import { Connection, ConnectionContext, Server, WSMessage } from "partyserver"

export default class RoomServer extends Server {
  static options = {
    hibernate: true
  }

  onConnect(
    connection: Connection,
    ctx: ConnectionContext,
  ): void | Promise<void> {
    var msg: ParticipantConnectedEvent = {
      connectionId: connection.id,
      name: connection. 
    }
    this.broadcast(msg)
  }

  onMessage(connection: Connection, message: WSMessage): void | Promise<void> {}

  onClose(connection: Connection, code: number, reason: string, wasClean: boolean): void | Promise<void> {
      
  }
}

export type ParticipantConnectedEvent = {
  connectionId: string,
  name: string,
}

export type ParticipantDisconnectedEvent = {
  connectionId: string,
  name: string,
}

