import { createApp } from "../dist/index.js"
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
    .get('/[id]')
    .validate(schema)
    .handler(async (req) => {

      console.log('validation handler called')

      // here we use functions to get an exact item instead of the object of items
      const contentType = await req.getHeader("Content-type")
      const animal = await req.getQuery("animal");
      const id = await req.getParam("id");
      const name = await req.getBodyItem("name")
      const jwt = await req.getCookie("jwt");

      return {
        body: {
          type: contentType?.split("/")[1],
          fluffy: animal,
          userId: id,
          hello: name,
          loggedIn: !!jwt
        },
      }
    })

  const { stop, ...details } = await app.listen();

  console.log({ msg: `Listening at`, ...details })

}

main();