import ResumeEditor from "@/components/user/ResumeEditor";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";

const CreateResumePage = async () => {
  const session = await getUserSession();

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
