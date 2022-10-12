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

    const hostname = app.hostname.split('/')[2].split(':')[0]

    return {
      stop: app.stop,
      hostname,
      port: app.port,
      url: `http://${hostname}:${app.port}/`
    }
  }

  return {
    listen
  }
}

export type BunServer = ReturnType<typeof createBunServer>;