import type { AppOptions } from "..";
import type { ListenerDetails } from ".";

// this has to be only types imports
import type { IncomingMessage, ServerResponse } from "node:http";

type NodeHandler = (conn: {req: IncomingMessage, res: ServerResponse}) => void

type NodeServerOptions = {
  handler: NodeHandler;
}

export const createNodeServer = 
  async (appOptions: AppOptions, { handler }: NodeServerOptions) => 
  {

  const { createServer } = await import("node:http")

  const server = createServer((req, res) => handler({ req, res }))

  const listen = () => {
    return new Promise<ListenerDetails>((resolve, reject) => {

      const _port = Number(appOptions.port);

      const handleError = (err: Error) => {
        reject(err)
      }

      server.addListener("error", handleError)

      server.listen(_port, "0.0.0.0", () => {
        const details = server.address();

        if (typeof details !== "object") {
          throw new Error(`server.address() returned as ${typeof details}`)
        }

        if (!details) {
          throw new Error(`server.address() returned as undefined`)
        }

        resolve({
          stop: server.close,
          hostname: details.address,
          port: details.port
        })
      })

      server.removeListener("error", handleError)

    })
  }

  
  return {
    listen
  }
}

export type NodeServer = ReturnType<typeof createNodeServer>;
