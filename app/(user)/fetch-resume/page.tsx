import Wrapper from "@/components/shared/Wrapper";
import ResumeItem from "@/components/user/ResumeItem";
import { fetchResume } from "@/data/action";
import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import React from "react";

const FetchResumePage = async () => {
  const user = await getUserSession();
  if (!user) {
    return redirect("/login");
  }
  const data = await fetchResume();
  if (!data) {
    return <div>No Resume found</div>;
  }

  const [resumeData, subscription, resumeCount] = data;
console.log("Subscription", subscription); 
  return (
    <Wrapper>
      <div className="space-y-1">
        <h1 className="text-bold text-3xl">Your resumes </h1>
        <p>Total: {resumeCount}</p>
      </div>
      <div className="flex grid-cols-2 flex-col sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumeData?.map((resume) => (
          <ResumeItem resume={resume} key={resume.id} />
        ))}
      </div>
    </Wrapper>
  );
};

export default FetchResumePage;
