import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  interests: string[];
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
};

const InterestField = ({ interests, addInterest, removeInterest }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (userInput.trim() !== "" && userInput.length <= 12) {
        addInterest(userInput);
        setUserInput("");
      }
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-0.5 min-h-[46px] w-full bg-white/10 rounded-[10px] px-4 py-2">
      {interests.map((interest, index) => (
        <div
          className="inline-block px-2 bg-white/10 rounded-[4px]"
          key={index}
        >
          <span className="text-xs leading-[14px] font-semibold ">
            {interest}
            <button
              className="ml-2 inline-flex justify-center items-center cursor-pointer"
              onClick={() => removeInterest(interest)}
            >
              &times;
            </button>
          </span>
        </div>
      ))}
      <input
        type="text"
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        value={userInput}
        className="bg-transparent text-xs leading-[14px] border-none py-2 flex-grow outline-none"
        ref={inputRef}
      />
    </div>
  );
};

export default InterestField;
