interface InputProps {
  label: string,
  id: string,
  type?: string,
  required?: boolean,
  onChange?: () => unknown
}

export function InputText({label, id, type, required, onChange}: InputProps) {
  return (
    <div className="flex flex-col gap-1 text-2xl">
      <label htmlFor={id}>{label}</label>
      <input type={type ?? "text"} required={required} id={id} className="h-11 p-3 rounded-xl" onChange={onChange}/>
    </div>  
  )
}
