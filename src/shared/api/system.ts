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

export async function getSystemById(systemId: string) {
  return await throwAnyErrors(GET("/system/{id}", {
    params: {
      path: {
        id: systemId
      }
    }
  }));
}

export async function getBalance(token: string) {
  return await throwAnyErrors(GET("/balance", {
    headers: {
      "Authorization": "Bearer " + token
    }
  }));
}
