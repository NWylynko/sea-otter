import { ListenerOptions } from "../listener";


export const createBunServer = async () => {

  const listen = ({ port }: ListenerOptions) => {
    return new Promise<void>((resolve, reject) => {

      resolve();

    })
  }

  return {
    listen
  }
}

export type BunServer = ReturnType<typeof createBunServer>;