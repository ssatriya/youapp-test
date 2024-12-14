import { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-[#0E191F] h-auto pl-7 pr-3 py-3 rounded-[14px] flex flex-col">
      {children}
    </div>
  );
};

const Header = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-between min-h-6">{children}</div>
  );
};

Card.Header = Header;
export default Card;
