import SeaOtter from "../dist"
import type { createApp } from "../dist"

const main = async () => {

  const seaOtter = SeaOtter()

  const createServer = seaOtter.createApp as typeof createApp

  const app = await createServer()

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