import type { NodeHandler } from "./node";
import type { BunHandler } from "./bun";
import type { DenoHandler } from "./deno";
import { Runtime } from "../getRuntime";

const servers = {
  bun: () => import("./bun").then(({ createBunServer }) => createBunServer),
  deno: () => import("./deno").then(({ createDenoServer }) => createDenoServer),
  node: () => import("./node").then(({ createNodeServer }) => createNodeServer),
};

export const getServer = (runtime: Runtime) => {
  return servers[runtime]();
};

export type GetServer = Awaited<ReturnType<typeof getServer>>;
export type StartServer = Awaited<ReturnType<GetServer>>;

export type ListenerDetails = {
  stop: () => void;
  hostname: string;
  port: number;
  url: string;
};

export type Handler = BunHandler & DenoHandler & NodeHandler;
