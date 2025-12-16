"use server";

import { getUserSession } from "@/lib/getUserSession";
import prisma from "@/lib/prisma";
import { ResumeType } from "@/lib/ValidationSchema";
import { redirect } from "next/navigation";

export const saveResume = async (values: ResumeType) => {
  const session = await getUserSession();
  if (!session) {
    return redirect("/login");
  }
  console.log(values);
  const { id } = values;
  const { photo, workExperience, education, ...resumeVaues } = values;
  const existingResume = id
    ? await prisma.resume.findUnique({
        where: { id, userId: session?.user.id },
      })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  if (id) {
    return await prisma.resume.update({
      where: { id, userId: session?.user.id },
      data: {
        ...resumeVaues,
        photoUrl: photo,
        WorkExperience: {
          deleteMany: {},
          create: workExperience?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        Education: {
          deleteMany: {},
          create: education?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        updatedAt: new Date(),
      },
    });
  } else {
    return await prisma.resume.create({
      data: {
        ...resumeVaues,
        photoUrl: photo,
        userId: session?.user.id,
        WorkExperience: {
          create: workExperience?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        Education: {
          create: education?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  }
};
