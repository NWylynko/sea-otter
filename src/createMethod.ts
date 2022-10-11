import { Response } from './Response';
import { Request, UnValidatedRequest } from './Request';
import { AppOptions } from ".";
import { Server } from './servers';
import type { z } from "zod"
import { createHandler } from './createHandler';
import { HandlersMap, HandlersMaps } from './createHandlersMaps';

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD"

export const createMethod = 
  (server: Server, options: AppOptions) => 
  (method: Method, handlersMap: HandlersMap) =>
{

  const handlerRegister = createHandler(options);

  const registerPath = (path: string) => {

    const handler = handlerRegister(path)
    const validate = createValidator(handler);

    const partsOfPath = path.split('/');

    handlersMap.set(partsOfPath, handler)

    return {
      validate,
      handler
    }

  }



  return registerPath;
}

type Schemas = {
  headers?: z.ZodType,
  query?: z.ZodType,
  params?: z.ZodType,
  body?: z.ZodType,
  cookies?: z.ZodType,
}

const createValidator = 
  (handler: (handler: (request: UnValidatedRequest) => Response<{}, {}, {}>) => (req: any, res: any) => Promise<void>) => 
  (schemas: Schemas) => {

    console.log('validate')

  return {
    handler
  }

}

