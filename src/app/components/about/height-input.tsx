import React, {
  forwardRef,
  useState,
  ChangeEvent,
  InputHTMLAttributes,
  ForwardedRef,
  Dispatch,
  SetStateAction,
} from "react";
import clsx from "clsx";
import Input from "../input";

type Props = {
  textLabel: string;
  label: string;
  placeholder: string;
  setMetric: Dispatch<SetStateAction<"cm" | "in">>;
  metric: "cm" | "in";
} & InputHTMLAttributes<HTMLInputElement>;

const HeightInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      textLabel,
      label,
      placeholder,
      onChange,
      setMetric,
      metric,
      value,
      ...rest
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [localValue, setLocalValue] = useState(value);

    const onHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            onChange={onHeightChange}
            {...rest}
          />
          <button
            className={clsx(
              "right-2 flex items-center justify-center mr-2 bg-transparent top-1/2 -translate-y-1/2",
              localValue !== "" ? "absolute" : "hidden"
            )}
            onClick={() => setMetric((prev) => (prev === "cm" ? "in" : "cm"))}
          >
            <span className="text-xs">{metric}</span>
          </button>
        </div>
      </div>
    );
  }
);

HeightInput.displayName = "HeightInput";

export default HeightInput;
