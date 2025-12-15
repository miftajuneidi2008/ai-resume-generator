"use server";

import { getUserSession } from "@/lib/getUserSession";
import prisma from "@/lib/prisma";
import { ResumeType } from "@/lib/ValidationSchema";
import { redirect } from "next/navigation";

export const createResume = async (values: ResumeType) => {
  const session = await getUserSession();
  if (!session) {
    return redirect("/login");
  }
  const { id } = values;
  console.log("recieced values", id);
  const { photo, workExperience, education, ...resumeVaues } = values;
  const existingResume = id
    ? await prisma.resume.findUnique({
        where: { id, userId: session?.user.id },
      })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }
};
