import type { Server } from "bun";
import { ListenerDetails } from ".";
import { AppOptions } from "..";

type BunHandler = (request: Request) => Response | Promise<Response>

type BunServerOptions = {
  handler: BunHandler;
}


export const createBunServer = 
  async (appOptions: AppOptions, { handler }: BunServerOptions) =>
  {

  const { server } = await import("./_bun.js")

  const listen = async (): Promise<ListenerDetails> => {
    
    const app = server({

      fetch: handler,

    })

    return {
      stop: app.stop,
      hostname: app.hostname,
      port: app.port,
    }
  }

  return {
    listen
  }
}

export type BunServer = ReturnType<typeof createBunServer>;