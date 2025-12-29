import ResumeEditor from "@/components/user/ResumeEditor";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { resumeToInclude } from "@/lib/types";
interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}
const CreateResumePage = async ({ searchParams }: PageProps) => {
  const { resumeId } = await searchParams;
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;
  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeToInclude,
      })
    : null;
  return (
    <Wrapper>
      <ResumeEditor resumeToEdit={resumeToEdit} />
    </Wrapper>
  );
};

export default CreateResumePage;
