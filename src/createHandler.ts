import type { Response } from './Response';
import type { Request } from './Request';
import type { AppOptions } from ".";
import type { Router } from './app';

// this is one crazy trail of functions
// 1. we pass through the app options defined when the user calls createApp
//    Additionally we need the router from FindMyWay to add the handler
// 2. we pass through the path to register the handler too
// 3. the handler for the request at the path is defined
// 4. lastly the raw request and response objects are passed through when
//    a request is called.

export const createHandler = 
  (appOptions: AppOptions, router: Router) => 
  (path: string) => 
  (handler: (request: Request) => Response) =>
  async (req: any, res: any) => {

    console.log('handler');

    // use the validator to validate the request if its defined
    const response = await handler({
      getHeaders: async () => ({}),
      getHeader: async (name: string) => undefined,

      getQueries: async () => ({}),
      getQuery: async (name: string) => undefined,

      getParams: async () => ({}),
      getParam: async (name: string) => undefined,
      
      getBody: async () => ({}),
      getBodyItem: async (name: string) => undefined,
      
      getCookies: async () => ({}),
      getCookie: async (name: string) => undefined,
    });

    // response send the response to the client
    return;

  };
