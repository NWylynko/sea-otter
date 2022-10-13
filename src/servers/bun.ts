import type { ListenerDetails } from ".";
import type { AppOptions } from "..";

export type BunHandler = (props: { runtime: "bun"; request: Request }) => Response | Promise<Response>;

type BunServerOptions = {
  handler: BunHandler;
};

export const createBunServer = async (appOptions: AppOptions, { handler }: BunServerOptions) => {
  const { server } = await import("./_bun.js");

  const listen = async (): Promise<ListenerDetails> => {
    const app = server({
      fetch: (request) => handler({ runtime: "bun", request }),
    });

    const hostname = app.hostname.split("/")[2].split(":")[0];

    return {
      stop: app.stop,
      hostname,
      port: app.port,
      url: `http://${hostname}:${app.port}/`,
    };
  };

  return {
    listen,
  };
};

export type BunServer = ReturnType<typeof createBunServer>;
