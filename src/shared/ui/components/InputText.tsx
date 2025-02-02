import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
}

export function InputText({label, id, type = "text", required, value, onChange, disabled, ...inputProps}: InputProps) {
  return (
    <div className="flex flex-col gap-1 text-2xl">
      <label htmlFor={id}>{label}</label>
      <input {...inputProps}
        type={type ?? "text"} required={required} disabled={disabled} id={id} value={value} className="h-11 p-3 rounded-xl disabled:bg-gray-100" onChange={onChange}/>
    </div>
  )
}
