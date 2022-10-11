import { Options } from "./app";
import { Server } from "./servers";

export const listener = 
  (server: Server, appOptions: Options) => 
  async () => {

  const port = Number(appOptions.port);

  return server.listen({ port })
};

export type ListenerOptions = {
  port: number;
};
