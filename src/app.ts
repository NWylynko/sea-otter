import { fakeFetch } from "./fakeFetch"
import { getRuntime } from "./getRuntime"
import { createMethod } from "./createMethod"
import { getServer } from "./servers"

import FindMyWay from "find-my-way";

const defaultOptions = {
  port: process.env.PORT ?? 3000
}

export type Options = typeof defaultOptions
type PartialOptions = Partial<Options>

export type Router = FindMyWay.Instance<FindMyWay.HTTPVersion.V1>

export const createApp = async (options: PartialOptions = defaultOptions) => {

  const options_ = { ...defaultOptions, ...options }

  const router = FindMyWay({})

  const runtime = getRuntime();
  const startServer = getServer(runtime);

  const server = await startServer(options_, {
    handler: () => {
      console.log('bruh')
    }
  });

  const defineMethod = createMethod(server, options_)

  const get = defineMethod("GET", router);
  const post = defineMethod("POST", router);
  const put = defineMethod("PUT", router);
  const patch = defineMethod("PATCH", router);
  const _delete = defineMethod("DELETE", router);
  const _options = defineMethod("OPTIONS", router);
  const head = defineMethod("HEAD", router);

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
