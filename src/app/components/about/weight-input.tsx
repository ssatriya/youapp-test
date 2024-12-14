import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";
import Input from "../input";
import clsx from "clsx";

type Props = {
  textLabel: string;
  label: string;
  placeholder: string;
} & InputHTMLAttributes<HTMLInputElement>;

const WeightInput = forwardRef<HTMLInputElement, Props>(
  (
    { textLabel, label, placeholder, onChange, value, ...rest }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [localValue, setLocalValue] = useState(value);

    const onWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
        setLocalValue(e.target.value);
      }
    };

    return (
      <div className="grid grid-cols-3">
        <div className="flex items-center">
          <label htmlFor={label} className="text-white/35 text-[13px]">
            {textLabel}
          </label>
        </div>
        <div className="relative col-span-2">
          <Input
            type="number"
            id={label}
            ref={ref}
            value={localValue}
            className={clsx(
              "h-9 border border-white/25 rounded-lg text-right pl-2 w-full",
              localValue !== "" ? "pr-10" : "px-4"
            )}
            placeholder={placeholder}
            onChange={onWeightChange}
            {...rest}
          />
          <div
            className={clsx(
              "right-2 flex items-center justify-center mr-2 bg-transparent top-1/2 -translate-y-1/2",
              localValue !== "" ? "absolute" : "hidden"
            )}
          >
            <span className="text-xs">kg</span>
          </div>
        </div>
      </div>
    );
  }
);

WeightInput.displayName = "WeightInput";

export default WeightInput;
