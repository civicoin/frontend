import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logout from "../assets/icons/logout.svg?react";
// import Logo from "../assets/icons/logo.svg?react";
// import Gear from "../assets/icons/gear.svg?react";
import ArrowUp from "../assets/icons/arrow_up.svg?react";
import { useJWTToken } from "../../lib";
import { getMe } from "../../api/user";

import { Logo } from "./Logo";

export function Header() {
  const navigate = useNavigate();
  const {token, clearToken} = useJWTToken();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (token) {
      getMe(token).then(res => {
        setUsername(res.data.name);
      });
    }
  }, []);

  const onLogout = useCallback(function onLogout() {
    clearToken();
    // navigate("")
  }, []);

  return (
    <header className="fixed w-full flex justify-between items-center px-9 pt-7">
      <Logo />
      <div className="flex items-center gap-2 text-2xl">
        {token !== undefined ?
        <>
          <span className="font-semibold">{username}</span>
          <Logout height="18" className={"cursor-pointer"} title={"Log out"} onClick={onLogout} />
          {/* TODO */}
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
