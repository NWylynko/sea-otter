import { fakeFetch } from "./fakeFetch"
import { getRuntime } from "./getRuntime"
import { createMethod } from "./createMethod"
import { getServer } from "./servers"
import { validateEnv } from "./env";

import FindMyWay from "find-my-way";

export type Options = {
  port: number | string,
  hostname: string
}
type PartialOptions = Partial<Options>

export type Router = FindMyWay.Instance<FindMyWay.HTTPVersion.V1>

export const createApp = async (options: PartialOptions = {}) => {

  const env = await validateEnv()

  const options_ = {
    port: env.PORT,
    hostname: env.HOSTNAME,
    ...options
  }

  const router = FindMyWay({})

  const runtime = getRuntime();
  const startServer = getServer(runtime);

  const server = await startServer(options_, {
    handler: (conn) => {
      console.log('bruh')

      return new Response(`hello`)
    }
  });

  const defineMethod = createMethod(server, options_, router)

  const get = defineMethod("GET");
  const post = defineMethod("POST");
  const put = defineMethod("PUT");
  const patch = defineMethod("PATCH");
  const _delete = defineMethod("DELETE");
  const _options = defineMethod("OPTIONS");
  const head = defineMethod("HEAD");

  const fetch = fakeFetch(server, options_, router);
  const listen = server.listen

  return {

    /**
    * Register a GET request
    */
    get,

    /**
    * Register a POST request
    */
    post,

    /**
    * Register a PUT request
    */
    put,

    /**
    * Register a PATCH request
    */
    patch,

    /**
    * Register a DELETE request
    */
    delete: _delete,

    /**
    * Register a OPTIONS request
    */
    options: _options,

    /**
    * Register a HEAD request
    */
    head,

    /**
    * Make a fetch request against the api (for testing it)
    */
    fetch,

    /**
    * Start listening for requests
    */
    listen
  }
}

export type App = ReturnType<typeof createApp>;
