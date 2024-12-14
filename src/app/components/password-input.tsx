import React, {
  Dispatch,
  forwardRef,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Input from "./input";
import EyeVisible from "./icons/eye-visible";
import EyeInvisible from "./icons/eye-invisible";

type Props = {
  password: string;
  placeholder?: string;
  label: string;
} & React.ComponentProps<typeof Input>;

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ password, placeholder, label, ...inputProps }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      if (password === "") {
        setShowPassword(false);
      }
    }, [password]);

    const handleReveal = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          label={label}
          placeholder={placeholder}
          className="relative"
          value={password}
          {...inputProps}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 transform -translate-y-1/2"
          onClick={handleReveal}
          disabled={password.length === 0}
        >
          {showPassword ? <EyeInvisible /> : <EyeVisible />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
