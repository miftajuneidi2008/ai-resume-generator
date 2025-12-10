import ResumeEditor from "@/feature/user/components/ResumeEditor";
import Wrapper from "@/components/user/Wrapper";
import React from "react";
import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";

const CreateResumePage = async () => {
  const session = await getUserSession();
  console.log(session);
  if (!session) {
    redirect("/login");
  }
  return (
    <Wrapper>
      <ResumeEditor />
    </Wrapper>
  );
};

export default CreateResumePage;
