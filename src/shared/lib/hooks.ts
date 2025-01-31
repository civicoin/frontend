import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { UserRole } from "../models";

type JWTData = {
  id: "string",
  systemId: "string",
  role: UserRole
}

export const useTokenDecode = (token: string) => jwtDecode<JwtPayload & JWTData>(token);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
