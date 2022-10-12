import type { AppOptions } from ".";
import type { Router } from "./app";
import type { Server } from "./servers";

export const fakeFetch = (server: Server, appOptions: AppOptions, router: Router) => async (path: string) => {
};
