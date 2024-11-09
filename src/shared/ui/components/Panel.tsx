import type React from "react";

interface PanelProps {
  children: React.ReactNode,
}

export function Panel(props: PanelProps) {
  return (
      <div className="h-full flex justify-center items-center">
        <div className="bg-panel rounded-2xl">
            {props.children}
        </div>
      </div>
  )
}
