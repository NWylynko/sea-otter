import type { Response } from './Response';
import type { Request } from './Request';
import type { AppOptions } from ".";

// this is one crazy trail of functions
// 1. we pass through the app options defined when the user calls createApp
// 2. we pass through the path to register the handler too
// 3. the handler for the request at the path is defined
// 4. lastly the raw request and response objects are passed through when
//    a request is called.

export const createHandler = 
  (appOptions: AppOptions) => 
  (path: string) => 
  (handler: (request: Request) => Response) =>
  async (req: any, res: any) => {

    console.log('handler');

    // use the validator to validate the request if its defined
    const response = await handler({
      headers: {},
      query: {},
      params: {},
      body: {},
      cookies: {},
    });

    // response send the response to the client
    return;

  };
