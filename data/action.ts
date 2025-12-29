"use server";

import { getUserSession } from "@/lib/getUserSession";
import prisma from "@/lib/prisma";
import { resumeToInclude } from "@/lib/types";
import { utapi } from "@/lib/uploadthing-server";
import { ResumeType } from "@/lib/ValidationSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const saveResume = async (values: ResumeType) => {
  const session = await getUserSession();
  if (!session) {
    return redirect("/login");
  }
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

//fetch resume

export async function fetchResume() {
  const session = await getUserSession();
  if (!session) {
    return redirect("/login");
  }
  const userId = session.user.id!;
  try {
    const resumeData = await prisma.resume.findMany({
      where: { userId: userId },
      include: resumeToInclude,
      orderBy: { updatedAt: "desc" },
    });
    if (resumeData) {
      return resumeData;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteResume(id: string) {
  const session = await getUserSession();

  if (!session?.user.id) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;
  const resume = await prisma.resume.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  if (resume.photoUrl) {
    const fileKey = resume.photoUrl.substring(
      resume.photoUrl.lastIndexOf("/") + 1,
    );

    // 3. Delete the file from UploadThing
    await utapi.deleteFiles(fileKey);
  }

  await prisma.resume.delete({
    where: {
      id,
    },
  });

  revalidatePath("/resumes");
}
