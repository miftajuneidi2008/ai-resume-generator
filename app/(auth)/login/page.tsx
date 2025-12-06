import Login from "@/components/Login";
import Wrapper from "@/components/user/Wrapper";
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
