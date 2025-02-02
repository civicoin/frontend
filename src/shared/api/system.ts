import { throwAnyErrors } from "@/shared/utils";
import { JWTToken } from "@/shared/models/user.ts";

import { GET } from "./client";
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

export async function getSystemById(systemId: string) {
  return await throwAnyErrors(GET("/system/{id}", {
    params: {
      path: {
        id: systemId
      }
    }
  }));
}

export async function getMembersByName(token: JWTToken, memberName: string) {
  return await throwAnyErrors(GET("/member/members", {
    headers: {
      "Authorization": "Bearer " + token
    },
    params: {
      query: {
        name: memberName
      }
    }
  }))
}

export async function getMe(token: JWTToken) {
  return await throwAnyErrors(GET("/system/{id}", {
    headers: {
      "Authorization": "Bearer " + token
    },
    params: {
      path: {
        id: "me"
      }
    }
  }))
}
