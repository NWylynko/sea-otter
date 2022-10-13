import { Response } from "./Response";
import { Request, UnValidatedRequest } from "./Request";
import { AppOptions } from ".";
import { StartServer } from "./servers";
import type { z } from "zod";
import { createHandler } from "./createHandler";
import { Router } from "./app";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";

export const createMethod = (options: AppOptions, router: Router) => (method: Method) => {
  const handlerRegister = createHandler(options, router);

  const registerPath = (path: string) => {
    const handler = handlerRegister(path);
    const validate = createValidator(handler);

    return {
      validate,
      handler,
    };
  };

  return registerPath;
};

type Schemas = {
  headers?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
  body?: z.ZodType;
  cookies?: z.ZodType;
};

const createValidator =
  (
    handler: (handler: (request: UnValidatedRequest) => Response<{}, {}, {}>) => (req: any, res: any) => Promise<void>
  ) =>
  (schemas: Schemas) => {
    console.log("validate");

    return {
      handler,
    };
  };
