import { ListenerOptions } from "../listener";

type DenoServerOptions = {
  handler: () => void;
}

export const createDenoServer = async ({ handler }: DenoServerOptions) => {

  const { server } = await import("./_deno")

  const requests = server({ hostname: "0.0.0.0", port: 3000 })

  const listen = ({ port }: ListenerOptions) => {
    return new Promise<void>((resolve, reject) => {

      resolve();

    })
  }

  return {
    listen
  }
}

export type DenoServer = ReturnType<typeof createDenoServer>;
