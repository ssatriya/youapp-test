import clsx from "clsx";
import { ReactNode } from "react";

import Battery from "./icons/battery";
import Signal from "./icons/signal";
import WifiSignal from "./icons/wifi-signal";

type Props = {
  appBar?: ReactNode;
  children?: ReactNode;
  backgroundColor?: number;
};

const Layout = ({ appBar, children, backgroundColor = 0 }: Props) => {
  return (
    <div
      className={clsx(
        "w-full h-full flex flex-col transition-all duration-300 p-4",
        backgroundColor === 0 ? "bg-[#09141A]" : "bg-main-gradient"
      )}
    >
      <div className="flex justify-between items-center px-4 py-2">
        <div className="w-[51px] h-5">
          <span className="font-bold text-[15px]">9:41</span>
        </div>
        <div className="flex gap-[5px]">
          <Signal />
          <WifiSignal />
          <Battery />
        </div>
      </div>
      <div className="mt-9 overflow-y-auto">
        {appBar}
        <div className="flex flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
