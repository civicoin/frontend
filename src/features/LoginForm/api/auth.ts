import { throwAnyErrors } from "@/shared/utils/api.ts";
import { POST } from "@/shared/api/client.ts";
import { CreateMemberSchema } from "@/features/LoginForm/models";

/**
 * 2 типа регистрации:
 * 1. Создание системы + создание первого пользователя
 * POST "/system" + POST "/member" (POST "/system/login")
 *
 * 2. Регистрация/вход пользовтеля в систему
 * ВХОД - POST "/member"
 * РЕГИСТРАЦИЯ - POST "/member/login"
 */

/** Login as existed member */
export async function signIn({name, systemId, password}: CreateMemberSchema) {
  return await throwAnyErrors(POST("/member/login", {
    body: {
      name, systemId, password
    }
  }));
}

/** Create new member */
export async function signUp({name, systemId, password}: CreateMemberSchema) {
  return await throwAnyErrors(POST("/member/", {
    body: {
      name, systemId, password
    }
  }));
}
