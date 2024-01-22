import React from "react";

interface InputProps {
  title: string,
  id: string,
  placeholder?: string,
  onChange?: () => string | number
}
const Input: React.FC<InputProps> = (props) => {
  return (
      <div className={"flex flex-col gap-2"}>
        <label className="block" htmlFor={props.id}>
          {props.title}
        </label>
        <input className="w-[420px] shadow appearance-none border rounded p-3 leading-tight focus:outline-none focus:shadow-outline" id={props.id} placeholder={props.placeholder || ""} type="text"/>
      </div>
  )
}

export default Input