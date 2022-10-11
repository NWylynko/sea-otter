import { createApp } from "../src"
import { z } from "zod";

const jwtRegex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/

const main = async () => {

  const app = await createApp()

  const schema = {
    headers: z.object({
      "Content-Type": z.literal("application/json")
    }),
    query: z.object({
      animal: z.enum(["dog", "cat"])
    }),
    params: z.object({
      id: z.string().uuid()
    }),
    body: z.object({
      name: z.string().max(12, `name can't be longer then 12 characters`)
    }),
    cookies: z.object({
      jwt: z.string().regex(jwtRegex, `invalid jwt syntax`).optional()
    })
  }

  app
    .get('/')
    .validate(schema)
    .handler(async (req) => {

      console.log('handler called')

      return {
        body: {
          type: req.headers["Content-type"]?.split("/")[1],
          fluffy: req.query.animal,
          userId: req.params.id,
          hello: req.body.name,
          loggedIn: !!req.cookies.jwt
        },
      }
    })

  await app.listen();

  console.log(`listening on port 3000`)

}

main();