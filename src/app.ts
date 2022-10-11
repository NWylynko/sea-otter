import { fakeFetch } from "./fakeFetch"
import { getRuntime } from "./getRuntime"
import { listener } from "./listener"
import { createMethod } from "./createMethod"
import { getServer } from "./servers"

import FindMyWay from "find-my-way";

const defaultOptions = {
  port: process.env.PORT ?? 3000
}

export type Options = typeof defaultOptions
type PartialOptions = Partial<Options>

export const createApp = async (options: PartialOptions = defaultOptions) => {

  const options_ = { ...defaultOptions, ...options }

  const router = FindMyWay({
    
  })

  const runtime = getRuntime();
  const startServer = getServer(runtime);

  const server = await startServer({
    handler: () => {
      console.log('bruh')
    }
  });

  const defineMethod = createMethod(server, options_)

  const get = defineMethod("GET", handlersMap.get);
  const post = defineMethod("POST", handlersMap.post);
  const put = defineMethod("PUT", handlersMap.put);
  const patch = defineMethod("PATCH", handlersMap.patch);
  const _delete = defineMethod("DELETE", handlersMap.delete);
  const _options = defineMethod("OPTIONS", handlersMap.options);
  const head = defineMethod("HEAD", handlersMap.head);

  const fetch = fakeFetch(server, options_);
  const listen = listener(server, options_);

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
