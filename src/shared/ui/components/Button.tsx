import classNames from "classnames";
import type React from "react";

interface ButtonProps {
  children?: React.ReactNode | string
  className?: string
  style?: object
  background?: string
  fontSize?: string
  onClick?: () => unknown
}

export function Button(props: ButtonProps) {
  const classes = classNames(
    props.className,
    props.fontSize ? `${props.fontSize}` : "text-4xl",
    props.background ? `${props.background}` : "bg-light"
  );

  return (
    <button onClick={props.onClick} style={props.style} className={`rounded-2xl cursor-pointer w-full flex justify-center items-center py-2 font-medium ${classes}`}>
      {props.children}
    </button>
  )
}
