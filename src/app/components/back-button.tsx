import React from "react";
import ChevronLeft from "./icons/chevron-left";
import { useRouter } from "next/navigation";

type Props = {
  isActive?: boolean;
};

const BackButton = ({ isActive = true }: Props) => {
  const router = useRouter();

  return (
    <button
      onClick={() => (isActive ? router.back() : null)}
      aria-label="back"
      className="flex min-w-[52px] justify-between items-center"
    >
      <ChevronLeft />
      <span className="font-bold text-sm">Back</span>
    </button>
  );
};

export default BackButton;
