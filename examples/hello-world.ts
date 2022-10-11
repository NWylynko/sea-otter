import { createApp } from "../src"

const main = async () => {

  const app = await createApp()

  app.get('/')
    .handler(async (req) => {
      return {
        body: {
          hello: req.query.name
        }
      }
    })

  await app.listen();

  console.log(`listening on port 3000`)

}

main();