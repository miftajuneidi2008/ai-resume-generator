import ResumeEditor from "@/components/user/ResumeEditor";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import { getUserSession } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { resumeToInclude } from "@/lib/types";
import { fetchResume } from "@/data/action";
import { canCreateResume } from "@/lib/permissions";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
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
  const data = await fetchResume();
  const [resumeData, subscription, resumeCount] = data;
  if (!data) {
    return null;
  }
  if (!subscription) return null;

  if (!canCreateResume(subscription, resumeCount)) {
    return (
      <div className="mx-auto flex max-w-7xl items-center justify-center h-screen flex-col gap-4">
        <div>
          <p>Maximum Resume count reached for this subscription level</p>
        </div>
       <Link href="/" className={buttonVariants({variant:"outline"})} >Upgrade your subscription for more service</Link>
      </div>
    );
  }

  return (
    <Wrapper>
      <ResumeEditor resumeToEdit={resumeToEdit} />
    </Wrapper>
  );
};

export default CreateResumePage;
