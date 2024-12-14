import clsx from "clsx";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  classNames?: string;
};

const BlueText = ({ children, classNames }: Props) => {
  return (
    <span
      className={clsx(
        "bg-blue-gradient bg-clip-text text-transparent",
        classNames
      )}
    >
      {children}
    </span>
  );
};

export default BlueText;
