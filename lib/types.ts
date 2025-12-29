import { UseFormReturn } from "react-hook-form";
import {
  EducationType,
  ResumeType,
  WorkExperienceType,
} from "./ValidationSchema";
import prisma from "./prisma";
import { Prisma } from "@/generated/prisma/client";

export interface EditorProps {
  resumeData: ResumeType;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeType>>;
}

export interface WorkExperienceProps {
  id: string;
  index: number;
  form: UseFormReturn<WorkExperienceType>;
  remove: (index: number) => void;
}

export interface EducationProps {
  id: string;
  index: number;
  form: UseFormReturn<EducationType>;
  remove: (index: number) => void;
}

export const resumeToInclude = {
  WorkExperience: true,
  Education: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeToInclude;
}>;

export interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}
