import Hero from "@/components/user/Hero";
import Pricing from "@/components/user/Pricing";
import Wrapper from "@/components/user/Wrapper";
import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import React from "react";

const UserPage = async () => {
  return (
    <>
      <Hero />
      <Pricing />
    </>
  );
};

export default UserPage;
