import Wrapper from "@/components/shared/Wrapper";
import { fetchResume } from "@/data/action";
import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import React from "react";

const FetchResumePage = async () => {
  const user = await getUserSession();
  if (!user) {
    return redirect("/login");
  }
  const resumeData = await fetchResume();
  return (
    <Wrapper>
      <div className="space-y-1">
        <h1 className="text-bold text-3xl">Your resumes </h1>
        <p>Total: {resumeData?.length}</p>
      </div>
    </Wrapper>
  );
};

export default FetchResumePage;
