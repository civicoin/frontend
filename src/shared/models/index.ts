import { components } from "../api/v1";

export type CreateMemberSchema = components["schemas"]["def-1"]["createMemberSchema"];
export type MemberResponseSchema = components["schemas"]["def-1"]["memberResponseSchema"];
export type LoginSystemSchema = components["schemas"]["def-0"]["loginSystemSchema"];

export enum UserRole {
  MEMBER = 'member',
  ADMIN = 'admin'
}

import accessTokenReducer, { setAccessToken, clearAccessToken } from "./user";

export { accessTokenReducer };
export { setAccessToken, clearAccessToken };

