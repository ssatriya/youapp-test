import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import Input from "../input";

type Props = {
  textLabel: string;
  label: string;
  placeholder: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "label">;

const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    { textLabel, label, placeholder, ...inputProps },
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
            className="h-9 border border-white/25 rounded-lg text-right w-full"
            placeholder={placeholder}
            onChange={() => {}}
            {...inputProps}
          />
        </div>
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;

// type Props = {
//   textLabel: string;
//   label: string;
//   placeholder: string;
// };

// const TextInput = ({ textLabel, label, placeholder }: Props) => {
//   return (
//     <div className="grid grid-cols-3">
//       <div className="flex items-center">
//         <label htmlFor={label} className="text-white/35 text-[13px]">
//           {textLabel}
//         </label>
//       </div>
//       <div className="flex items-center col-span-2">
//         <Input
//           type="text"
//           label={label}
//           className="h-9 border border-white/25 rounded-lg text-right"
//           placeholder={placeholder}
//           onChange={() => {}}
//         />
//       </div>
//     </div>
//   );
// };

// export default TextInput;
