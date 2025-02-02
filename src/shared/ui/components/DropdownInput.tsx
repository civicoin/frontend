import { useState } from 'react';

import { InputText, type InputProps } from "./InputText";

interface DropdownInputProps extends InputProps {
  variants: string[],
  onChoose?: (value: string) => unknown,
}

export function DropdownInput({ label, variants, onChoose, onChange, ...inputProps }: DropdownInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mouseOnList, setMouseOnList] = useState(false);

  const filteredVariants = variants.filter(item => item.startsWith(inputValue));

  return (
    <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
      <InputText
        {...inputProps}
        label={label}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowDropdown(true);
          onChange && onChange(e);
        }}
        onFocus={() => setShowDropdown(variants.length > 0)}
        onBlur={() => !mouseOnList && setShowDropdown(false)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      {showDropdown && filteredVariants.length > 0 && (
        <ul onMouseEnter={() => setMouseOnList(true)} onMouseLeave={() => setMouseOnList(false)} className="absolute top-full left-0 w-full mt-1 border border-gray-300 rounded-md bg-white shadow-lg max-h-48 overflow-y-auto z-10">
          {filteredVariants.map((item, index) => (
            <li
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setInputValue(item);
                setShowDropdown(false);
                onChoose && onChoose(item);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
