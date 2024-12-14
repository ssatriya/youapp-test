import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  classNames?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        aria-label={label}
        {...rest}
        className={clsx(
          className,
          "w-full p-[17px] bg-white/5 rounded-lg text-xs placeholder:text-xs focus:ring-1 focus:ring-[#1F4247] focus:outline-none"
        )}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
