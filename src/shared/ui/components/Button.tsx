import classNames from "classnames";
import type { PropsWithChildren } from "react";

interface ButtonProps {
  className?: string
  style?: object
  background?: string
  fontSize?: string
  disabled?: boolean
  onClick?: () => unknown
}

export function Button(props: PropsWithChildren & ButtonProps) {
  const classes = classNames(
    props.className,
    props.fontSize ? `${props.fontSize}` : "text-4xl",
    props.background ? `${props.background}` : "bg-light"
  );

  return (
    <button disabled={props.disabled || false} onClick={props.onClick} style={props.style}
            className={`rounded-2xl cursor-pointer w-full flex justify-center items-center py-2 font-medium ${classes} disabled:cursor-default disabled:bg-gray-100`}>
      {props.children}
    </button>
  )
}
