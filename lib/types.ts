import { UseFormReturn } from "react-hook-form";
import {
  EducationType,
  ResumeType,
  WorkExperienceType,
} from "./ValidationSchema";

export interface EditorProps {
  resumeData: ResumeType;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeType>>;
}

export interface WorkExperienceProps {
  index: number;
  form: UseFormReturn<WorkExperienceType>;
  remove: (index: number) => void;
}

export interface EducationProps {
  index: number;
  form: UseFormReturn<EducationType>;
  remove: (index: number) => void;
}
