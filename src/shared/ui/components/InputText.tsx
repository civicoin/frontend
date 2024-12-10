import React from "react";

interface InputProps {
  label: string,
  id: string,
  type?: string,
  required?: boolean,
  value?: string,
  disabled?: boolean,
  onChange?:  React.ChangeEventHandler<HTMLInputElement>
}

export function InputText({label, id, type, required, value, onChange, disabled}: InputProps) {
  return (
    <div className="flex flex-col gap-1 text-2xl">
      <label htmlFor={id}>{label}</label>
      <input type={type ?? "text"} required={required} disabled={disabled} id={id} value={value} className="h-11 p-3 rounded-xl disabled:bg-gray-100" onChange={onChange}/>
    </div>
  )
}
