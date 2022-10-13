import type { ListenerDetails } from ".";
import type { AppOptions } from "..";

export type DenoHandler = (props: { runtime: "deno"; conn: Deno.Conn }) => void;

type DenoServerOptions = {
  handler: DenoHandler;
};

export const createDenoServer = async (appOptions: AppOptions, { handler }: DenoServerOptions) => {
  const { server } = await import("./_deno.js");

  const listen = async (): Promise<ListenerDetails> => {
    const port = Number(appOptions.port);

    const config = { hostname: "0.0.0.0", port };

    const requests = server(config);

    for await (const conn of requests) {
      handler({ runtime: "deno", conn });
    }

    if (requests.addr.transport !== "tcp") {
      throw new Error(`not a tcp http server`);
    }

    return {
      stop: requests.close,
      hostname: requests.addr.hostname,
      port: requests.addr.port,
      url: `http://${requests.addr.hostname}:${requests.addr.port}/`,
    };
  };

  return {
    listen,
  };
};

export type DenoServer = ReturnType<typeof createDenoServer>;
