import { FetchResponse } from "openapi-fetch";
import { json } from "react-router-dom";

export async function throwAnyErrors<T extends Record<string | number, unknown>, O, Media extends `${string}/${string}`>(
    responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    throw json(error, { status: response.status });
  }

  return data as NonNullable<typeof data>;
}
