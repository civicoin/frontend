import { JWTToken } from "@/shared/lib/hooks.ts";
import { GET } from "@/shared/api/client.ts";
import { throwAnyErrors } from "@/shared/utils";

export async function getMe(accessToken: JWTToken) {
  return await throwAnyErrors(GET("/member/{id}", {
    params: {
      path: {
        id: "me"
      }
    },
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  }))
}