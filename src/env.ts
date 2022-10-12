import { getRuntime } from './getRuntime';
import { z } from "zod";

export const validateEnv = async () => {

  const envSchema = z.object({
    PORT: z.string().default("3000").transform((port) => Number(port)),
    HOSTNAME: z.string().default("0.0.0.0")
  })

  const runtime = getRuntime()

  if (runtime === "deno") {
    return envSchema.parseAsync({ ...Deno.env.toObject()  })
  }

  return envSchema.parseAsync({ ...process.env });

}
