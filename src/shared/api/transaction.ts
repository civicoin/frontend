import { throwAnyErrors } from "@/shared/utils";
import { POST } from "@/shared/api/client";
import { JWTToken } from "@/shared/models/user.ts";

export async function issue(token: JWTToken, receiverId: string, amount: string, signature?: string) {
  /* TODO signature */
  signature = "";
  return await throwAnyErrors(POST("/tx/issue", {
    headers: {
      "Authorization": "Bearer " + token
    },
    body: {
      receiverId,
      amount,
      signature,
      hmac: signature
    }
  }));
}

export async function send(token: JWTToken, receiverId: string, amount: string, signature?: string) {
  /* TODO signature */
  signature = "";
  return await throwAnyErrors(POST("/tx/send", {
    headers: {
      "Authorization": "Bearer " + token
    },
    body: {
      receiverId,
      amount,
      signature
    }
  }));
}