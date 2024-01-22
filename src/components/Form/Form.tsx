import React, { ReactNode } from "react";

type FormProps = {
  onSubmit: () => any,
  children?: ReactNode
}

const Form: React.FC<FormProps> = (props) => {
  return <form className={"flex flex-col gap-5 p-[30px] bg-white shadow-lg text-gray-700"} onSubmit={props.onSubmit}>
    {props.children}
  </form>
}

export default Form