import * as SeaOtter from "../deno_dist/index.ts"
import type { createApp } from "../dist"

const main = async () => {

  const startServer = SeaOtter.createApp as typeof createApp

  const app = await startServer()

  app.get('/')
    .handler(async (req) => {

      const { name } = await req.getQueries();

      return {
        body: {
          hello: name
        }
      }
    })  

  const { stop, ...details } = await app.listen();

  console.log({ msg: `Listening at`, ...details })

}

main();