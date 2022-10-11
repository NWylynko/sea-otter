import { listener, ListenerOptions } from "../listener"

// this has to be only types imports
import type { IncomingMessage, ServerResponse } from "node:http";

type NodeServerOptions = {
  handler: (req: IncomingMessage, res: ServerResponse) => void;
}

export const createNodeServer = async ({ handler }: NodeServerOptions) => {

  const { createServer } = await import("node:http")

  const server = createServer(handler)

  const listen = ({ port }: ListenerOptions) => {
    return new Promise<void>((resolve, reject) => {

      const _port = Number(port);

      const handleError = (err: Error) => {
        reject(err)
      }

      server.addListener("error", handleError)

      server.listen(_port, "0.0.0.0", () => {
        resolve()
      })

      server.removeListener("error", handleError)

    })
  }

  
  return {
    listen
  }
}

export type NodeServer = ReturnType<typeof createNodeServer>;
