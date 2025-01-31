import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logout from "../assets/icons/logout.svg?react";
import ArrowUp from "../assets/icons/arrow_up.svg?react";
import { getMe as userGetMe } from "../../api/user";
import { getMe as systemGetMe } from "../../api/system";
import { useAppDispatch, useAppSelector } from "../../lib";
import { clearAccessToken, getToken } from "../../models/user";
// import { useDecode } from "../../lib/hooks.ts";
import { useTokenDecode as parseToken } from "../../lib/hooks";
import { UserRole } from "../../models";

import { Logo } from "./Logo";

export function Header() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getToken);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (token) {
      let getMeFunction;
      const decodedData = parseToken(token);
      switch (decodedData.role) {
        case UserRole.ADMIN:
          getMeFunction = systemGetMe;
          break;
        case UserRole.MEMBER:
          getMeFunction = userGetMe;
          break;
      }
      if (!getMeFunction) {
        throw new Error("User type is not defined!");
      }

      getMeFunction(token).then(res => {
        setUsername(res.data.name);
      });
    }
  }, [token]);

  const onLogout = useCallback(function onLogout() {
    dispatch(clearAccessToken());
  }, []);

  return (
    <header className="fixed w-full flex justify-between items-center px-9 pt-7">
      <Logo />
      <div className="flex items-center gap-2 text-2xl">
        {token !== null ?
        <>
          <span className="font-semibold">{username}</span>
          <Logout height="18" width="18" className={"cursor-pointer"} title={"Log out"} onClick={onLogout} />
          {/* TODO settings */}
          {/* <Button className="px-2" background="bg-dark">
            <Gear width="18" height="18" />
          </Button> */}
        </> :
        <div className="flex gap-1 items-center cursor-pointer" onClick={() => navigate("/login")}>
          <span className="font-semibold">Log in</span>
          <ArrowUp height="18" transform="rotate(90)" />
        </div>
        }
      </div>
    </header>
  )
}

export default Header;
