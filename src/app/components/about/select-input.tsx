import {
  FocusEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ChevronDown from "../icons/chevron-down";
import Input from "../input";
import { FieldValues, Path, UseFormRegisterReturn } from "react-hook-form";

type BaseSelectInputProps<TFieldValues extends FieldValues> = {
  textLabel: string;
  label: string;
  placeholder: string;
  options: { label: string; value: any }[];
  name?: Path<TFieldValues>;
};

type SelectInputProps<TFieldValues extends FieldValues> =
  BaseSelectInputProps<TFieldValues> &
    Partial<UseFormRegisterReturn> &
    Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

const SelectInput = forwardRef(
  <TFieldValues extends FieldValues>(
    {
      textLabel,
      label,
      placeholder,
      options,
      value: propValue,
      onChange,
      onBlur,
      name,
      ...inputProps
    }: SelectInputProps<TFieldValues>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const initialSelected = options.find(
      (item) =>
        item.value === propValue || item.value === inputProps.defaultValue
    ) || { label: "", value: "" };

    const [selected, setSelected] = useState(initialSelected);
    const selectRef = useRef<HTMLSelectElement>(null);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      const selectedOption = options.find(
        (item) => item.value === selectedValue
      );

      if (selectedOption) {
        setSelected(selectedOption);

        // Always trigger onChange, even for the first option
        if (onChange) {
          onChange({
            target: {
              name: name || label,
              value: selectedOption.value,
            },
          } as React.ChangeEvent<HTMLSelectElement>);
        }
      }
    };

    const handleFocus = useCallback(() => {
      selectRef.current?.focus();
    }, []);

    const handleBlur = useCallback(() => {
      selectRef.current?.blur();

      if (onBlur) {
        try {
          const blurEvent = {
            target: {
              name: name || label,
            },
          } as React.FocusEvent<HTMLInputElement>;

          onBlur(blurEvent);
        } catch (error) {
          console.warn("Error in SelectInput onBlur:", error);
        }
      }
    }, [onBlur, name, label]);

    return (
      <div className="grid grid-cols-3 w-full">
        <div className="flex items-center">
          <label htmlFor={label} className="text-white/35 text-[13px]">
            {textLabel}
          </label>
        </div>
        <div className="relative w-full flex items-center col-span-2 gap-2.5">
          <Input
            ref={ref}
            type="text"
            className="h-9 border border-white/25 rounded-lg text-right pl-2 pr-8 w-full"
            placeholder={placeholder}
            value={selected.label}
            tabIndex={-1}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={() => {}}
            name={name}
            {...inputProps}
          />
          <div className="w-2.5 h-2.5 flex absolute right-2 items-center justify-center mr-2">
            <ChevronDown />
          </div>
          <select
            ref={selectRef}
            value={selected.value}
            onChange={handleSelectChange}
            className="absolute opacity-0 cursor-pointer w-full"
            name={name}
          >
            {options.map((item, index) => (
              <option
                key={index}
                value={item.value}
                style={{ background: "black" }}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput as <TFieldValues extends FieldValues>(
  props: SelectInputProps<TFieldValues> & {
    ref?: ForwardedRef<HTMLInputElement>;
  }
) => ReturnType<typeof SelectInput>;

// type Props = {
//   textLabel: string;
//   label: string;
//   placeholder: string;
//   options: { label: string; value: any }[];
//   value?: string;
// };

// const SelectInput = ({
//   textLabel,
//   label,
//   placeholder,
//   options,
//   value = "",
// }: Props) => {
//   const selectRef = useRef<HTMLSelectElement>(null);
//   const [selected, setSelected] = useState(
//     () =>
//       options.find((item) => item.value === value) || { label: "", value: "" }
//   );

//   const handleFocus = useCallback(() => {
//     selectRef.current?.focus();
//   }, []);

//   const handleBlur = useCallback(() => {
//     selectRef.current?.blur();
//   }, []);

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedValue = e.target.value;
//     const selectedOption = options.find((item) => item.value === selectedValue);
//     if (selectedOption) {
//       setSelected(selectedOption);
//     }
//   };

//   return (
//     <div className="grid grid-cols-3 w-full">
//       <div className="flex items-center">
//         <label htmlFor={label} className="text-white/35 text-[13px]">
//           {textLabel}
//         </label>
//       </div>
//       <div className="relative w-full flex items-center col-span-2 gap-2.5">
//         <Input
//           type="text"
//           className="h-9 border border-white/25 rounded-lg placeholder:text-right placeholder:pr-8 text-left pl-2 w-full"
//           placeholder={placeholder}
//           value={selected.label}
//           tabIndex={-1}
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           onChange={() => {}}
//           label="gender"
//         />
//         <div className="w-2.5 h-2.5 flex absolute right-2 items-center justify-center mr-2">
//           {/* Replace with your ChevronDown component */}
//           {/* <span>▼</span> */}
//           <ChevronDown />
//         </div>
//         <select
//           ref={selectRef}
//           value={selected.value}
//           onChange={handleSelectChange}
//           className="absolute opacity-0 cursor-pointer w-full"
//         >
//           {options.map((item, index) => (
//             <option
//               key={index}
//               value={item.value}
//               style={{ background: "black" }}
//             >
//               {item.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default SelectInput;
