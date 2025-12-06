import { UseFormReturn } from "react-hook-form";
import { ResumeType, WorkExperienceType } from "./ValidationSchema";

export interface EditorProps {
  resumeData: ResumeType;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeType>>;
}

export interface WorkExperienceProps {
  index: number;
  form: UseFormReturn<WorkExperienceType>;
  remove: (index: number) => void;
}
