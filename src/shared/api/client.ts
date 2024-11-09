import createClient from "openapi-fetch";
import type { Middleware } from "openapi-fetch";

import { backendBaseUrl } from "../config";
import type { paths } from "./v1";

const myMiddleware: Middleware = {
  onRequest({request}) {
    const origin = new URL(request.url).origin;
    request.headers.set("origin", origin);
    return request;
  }
};

const client = createClient<paths>({ baseUrl: backendBaseUrl });
client.use(myMiddleware);

export const { GET, POST, PUT, DELETE } = client;
