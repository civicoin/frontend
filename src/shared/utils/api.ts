import { FetchResponse } from "openapi-fetch";
import { json } from "react-router-dom";

export async function throwAnyErrors<T extends Record<string | number, unknown>, O, Media extends `${string}/${string}`>(
    responsePromise: Promise<FetchResponse<T, O, Media>>,
) {
  const { data, error, response } = await responsePromise;

  if (error !== undefined) {
    const obj = json(error, { status: response.status });
    const serializedData = await obj.json();
    // const obj = json(error, { status: response.status });
    throw serializedData;
  }

  // return data as NonNullable<typeof data>
  return { data: data as NonNullable<typeof data>, error, response }
}
