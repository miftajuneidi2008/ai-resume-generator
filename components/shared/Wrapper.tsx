import cn from "@/lib/utility/cn";
import React from "react";

const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("mx-auto max-w-7xl", className)}>{children}</div>;
};

export default Wrapper;
