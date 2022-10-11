
type UnknownObject = { [key: string]: string }

export type Request = UnValidatedRequest

export type UnValidatedRequest = {
  headers: UnknownObject,
  query: UnknownObject,
  params: UnknownObject,
  body: UnknownObject,
  cookies: UnknownObject,
}

