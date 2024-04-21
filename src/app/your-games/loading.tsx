"use client";
import { IoFootballOutline } from "react-icons/io5";
interface ILoading {}

const Loading: React.FC<ILoading> = ({}) => {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <IoFootballOutline className="h-12 w-12 animate-bounce" />
    </div>
  );
};

export default Loading;
