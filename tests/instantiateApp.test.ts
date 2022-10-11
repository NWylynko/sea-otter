import { createApp } from "../src"
import { z } from "zod"
import { it } from "vitest";

it('should instantiate an app', async () => {
  const app = await createApp();

  const schema = {
    query: z.object({
      name: z.string()
    }),
  }

  app
    .get('/')
    .validate(schema)
    .handler(async (req) => {
      return {
        body: {
          hello: req.query.name
        }
      }
    })

  const response = await app.fetch('/?name=nick')

  console.log(response)
});

// app.listen({ port: 3000 })