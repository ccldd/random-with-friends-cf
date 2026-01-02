import { DurableObject } from "cloudflare:workers";

export class RoomDurableObject extends DurableObject<CloudflareEnv> {
  constructor(ctx: DurableObjectState, env: CloudflareEnv) {
    super(ctx, env)
  }
}
