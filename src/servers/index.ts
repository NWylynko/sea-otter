import { createNodeServer } from './node';
import { createBunServer } from './bun';
import { createDenoServer } from './deno';
import { Runtime } from '../getRuntime';

const servers = {
  bun: createBunServer,
  deno: createDenoServer,
  node: createNodeServer
}

export const getServer = (runtime: Runtime) => {
  return servers[runtime];
}

export type StartServer = ReturnType<typeof getServer>
export type Server = Awaited<ReturnType<StartServer>>