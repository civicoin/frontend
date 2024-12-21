import { throwAnyErrors } from "@/shared/utils/api.ts";
import { POST } from "@/shared/api/client.ts";
import { CreateMemberSchema, LoginSystemSchema } from "../models";

/** Login as existed member */
export async function signIn({name, systemId, password}: CreateMemberSchema) {
  return await throwAnyErrors(POST("/member/login", {
    body: {
      name, systemId, password
    }
  }));
}

/** Sign in as superuser of system */
export async function signInAsSystem({name: systemName, password}: LoginSystemSchema) {
  return await throwAnyErrors(POST("/system/login", {
    body: {
      name: systemName, password
    }
  }))
}

/** Create a new member */
export async function signUp({name, systemId, password}: CreateMemberSchema) {
  return await throwAnyErrors(POST("/member", {
    body: {
      name, systemId, password
    }
  }));
}
