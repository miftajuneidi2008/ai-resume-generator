import Login from "@/components/shared/Login";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

const page = () => {
  return (
    <Wrapper className="h-screen">
      <div className="flex h-full w-full items-center justify-center">
        <Login />
      </div>
    </Wrapper>
  );
};

export default page;
