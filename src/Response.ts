export type Response<Body extends object = {}, Headers extends object = {}, Cookies extends object = {}> = Promise<{
  body?: Body;
  headers?: Headers;
  cookies?: Cookies;
}>;
