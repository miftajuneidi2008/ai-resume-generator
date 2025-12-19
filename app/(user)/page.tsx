import Hero from "@/components/shared/Hero";
import Pricing from "@/components/shared/Pricing";
import Wrapper from "@/components/shared/Wrapper";
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
