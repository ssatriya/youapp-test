import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button = ({ children, className, disabled, ...rest }: Props) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "relative w-full h-12 rounded-xl text-bold bg-[linear-gradient(108deg,_#62CDCB_24.88%,_#4599DB_78.49%)] cursor-pointer",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      {...rest}
    >
      <div
        className={clsx(
          "absolute left-0 -bottom-2 right-0 rounded-xl bg-gradient-to-r from-[#62CDCB] to-[#4599DB] blur h-10 transition-opacity duration-300",
          disabled ? "opacity-0" : "opacity-75"
        )}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
