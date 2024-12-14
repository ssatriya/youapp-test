import React from "react";
import MoreIcon from "./icons/more-icon";

const MoreButton = () => {
  return (
    <button
      aria-label="back"
      className="flex min-w-[52px] items-center justify-center"
    >
      <MoreIcon />
    </button>
  );
};

export default MoreButton;
