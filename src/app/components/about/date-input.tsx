import React, {
  forwardRef,
  useState,
  ChangeEvent,
  InputHTMLAttributes,
} from "react";
import Input from "../input";

type Props = {
  textLabel: string;
  label: string;
  placeholder: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "label">;

const DateInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { textLabel, label, placeholder, value, onChange, ...rest } = props;

  const [localValue, setLocalValue] = useState(value || ""); // Local state for input value

  const formatValue = (val: string) => {
    let formatted = val.replace(/\D/g, ""); // Remove non-digit characters
    if (formatted.length > 2) {
      formatted = `${formatted.slice(0, 2)} ${formatted.slice(2)}`;
    }
    if (formatted.length > 5) {
      formatted = `${formatted.slice(0, 5)} ${formatted.slice(5)}`;
    }
    return formatted;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatValue(rawValue);
    setLocalValue(formatted);
    if (onChange) {
      e.target.value = rawValue;
      onChange(e);
    }
  };

  return (
    <div className="grid grid-cols-3">
      <div className="flex items-center">
        <label htmlFor={label} className="text-white/35 text-[13px]">
          {textLabel}
        </label>
      </div>
      <div className="flex items-center col-span-2">
        <Input
          type="text"
          id={label}
          ref={ref}
          value={localValue} // Use local state for immediate input feedback
          className="h-9 border border-white/25 rounded-lg text-right"
          placeholder={placeholder}
          onChange={handleChange} // Handle changes locally and externally
          {...rest} // Spread remaining props (e.g., react-hook-form props)
        />
      </div>
    </div>
  );
});

DateInput.displayName = "DateInput";

export default DateInput;
