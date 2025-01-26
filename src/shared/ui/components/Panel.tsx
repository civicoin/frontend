import type { PropsWithChildren } from "react";

export function Panel(props: PropsWithChildren) {
  return (
      <div className="h-full flex justify-center items-center">
        <div className="bg-panel rounded-2xl">
            {props.children}
        </div>
      </div>
  )
}
