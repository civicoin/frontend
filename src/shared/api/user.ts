import { GET } from "@/shared/api/client.ts";
import { throwAnyErrors } from "@/shared/utils";
import { JWTToken } from "@/shared/models/user.ts";

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

export async function getUserBalance(token: JWTToken) {
  return await throwAnyErrors(GET("/balance", {
    headers: {
      "Authorization": "Bearer " + token
    }
  }));
}