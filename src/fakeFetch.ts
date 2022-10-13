import type { AppOptions } from ".";
import type { Router } from "./app";
import type { StartServer } from "./servers";

export const fakeFetch = (appOptions: AppOptions, router: Router) => async (path: string) => {};
