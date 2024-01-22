import React from "react";

interface ButtonProps {
  text: string,
  type: ButtonTypes,
  onClick?: () => any
}
enum ButtonTypes {
  Submit = "submit"
}
type ButtonComponent = React.FC<ButtonProps> & {
  Type: typeof ButtonTypes
}

const Button: ButtonComponent = (props) => {
  return (
      <button type={props.type} className={"bg-focus text-white py-3 rounded"} onClick={props.onClick}>
        {props.text}
      </button>
  )
}
Button.Type = ButtonTypes

export default Button