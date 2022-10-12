import { createApp } from "../dist/index.js"

const main = async () => {

  const app = await createApp()

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