import React, { ReactNode } from "react";

type AlertProps = {
  text: string
}

const Alert: React.FC<AlertProps> = (props) => {
  return (
      <div className="absolute w-[420px] flex justify-between items-center p-2 rounded-lg bg-white shadow-lg text-gray-700" role="alert">
        <div className={"flex items-center"}>
          <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">
            A simple info alert. Give it a click if you like.
          </div>
        </div>
        <button type="button" className="rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-gray-200 flex items-center justify-center h-8 w-8" aria-label="Close">
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
  )
}

export default Alert