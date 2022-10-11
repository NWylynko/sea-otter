sea-otter

a web framework :)

aims:

1. request -> response

 - lots of frameworks use this:
    const handler = (req: Request, res: Response) => {}

 - but I want this approach:
    const handler = (req: Request): Response => {}

To me this seems to fit better with the IO approach of coding, inputs and outputs. Given a request object return a response for the client.

2. Strong types from validation

Inspired from trpc, attempting a similar in nature api, using a validation module of choice (zod) to build a strongly typed api.

3. Support Node, Deno and Bun

No idea if this is going to be possible but it would be nice. I am in strong support for competition in this space.