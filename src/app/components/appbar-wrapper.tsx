import clsx from "clsx";
import { PropsWithChildren } from "react";

const AppbarWrapper = ({
  children,
  classNames,
}: PropsWithChildren<{ classNames?: string }>) => {
  return <div className={clsx("min-h-[26px]", classNames)}>{children}</div>;
};

export default AppbarWrapper;
