import React from "react";

interface HeaderProps {
  loggedIn: boolean
}
const Header: React.FC<HeaderProps> = (props) => {

  return (
      <div className={"grid grid-cols-3 bg-white/60 text-3xl px-3 h-[80px]"}>
        { props.loggedIn ?
            <>
              <div className={"col-start-2 flex flex-col justify-center items-center"}>Dashboard</div>
              <div className={"col-start-3 flex justify-end items-center"}>Good afternoon, user1!</div>
            </> :
            <>
              <div className={"col-start-2 flex flex-col justify-center items-center"}>Good afternoon!</div>
            </>
        }
      </div>
  )
}

export default Header