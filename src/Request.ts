type UnknownObject = { [key: string]: string | undefined };
type UnknownGetter = () => Promise<UnknownObject>;
type UnknownNamedGetter = (name: string) => Promise<string | undefined>;

export type Request = UnValidatedRequest;

export type UnValidatedRequest = {
  getHeaders: UnknownGetter;
  getHeader: UnknownNamedGetter;

  getQueries: UnknownGetter;
  getQuery: UnknownNamedGetter;

  getParams: UnknownGetter;
  getParam: UnknownNamedGetter;

  getBody: UnknownGetter;
  getBodyItem: UnknownNamedGetter;

  getCookies: UnknownGetter;
  getCookie: UnknownNamedGetter;
};
