import { GET } from "./client.ts";
import { throwAnyErrors } from "@/shared/utils";
// import { throwAnyErrors } from "../utils/api.ts";

export async function getSystemByName(systemName: string) {
  return await throwAnyErrors(GET("/system/systems", {
    params: {
      query: {
        name: systemName
      }
    }
  }));
}
