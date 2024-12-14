import { ForwardedRef, forwardRef } from "react";
import Input from "../input";

type Props = {
  textLabel: string;
  label: string;
  placeholder: string;
  value: string;
};

const HoroscopeInput = forwardRef(
  (
    { textLabel, label, placeholder, value }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="grid grid-cols-3">
        <div className="flex items-center">
          <label htmlFor={label} className="text-white/35 text-[13px]">
            {textLabel}
          </label>
        </div>
        <div className="flex items-center col-span-2">
          <Input
            ref={ref}
            type="text"
            label={label}
            value={value}
            className="h-9 border border-white/25 rounded-lg text-right text-white/50"
            placeholder={placeholder}
            onChange={() => {}}
            readOnly
          />
        </div>
      </div>
    );
  }
);

HoroscopeInput.displayName = "HoroscopeInput";

export default HoroscopeInput;
