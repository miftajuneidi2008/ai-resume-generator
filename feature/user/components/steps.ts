import React from "react";
import PersonalInfo from "../form/PersonalInfo";
import GeneralInfo from "../form/GeneralInfo";
import { EditorProps } from "@/lib/types";
import { WorkExperience } from "../form/WorkExperience";
import Education from "../form/Education";
import Skill from "../form/Skill";
import SummaryInfo from "../form/SummaryInfo";

export const steps: {
  title: string;
  Component: React.ComponentType<EditorProps>;
  key: string;
}[] = [
  {
    title: "General Info",
    Component: GeneralInfo,
    key: "general-info",
  },
  {
    title: "Personal Info",
    Component: PersonalInfo,
    key: "personal-info",
  },
  {
    title: "Work Experience",
    Component: WorkExperience,
    key: "work-experience",
  },
  {
    title: "Education",
    Component: Education,
    key: "education",
  },
  {
    title: "Skills",
    Component: Skill,
    key: "skills",
  },
  {
    title: "Summary",
    Component: SummaryInfo,
    key: "summary",
  },
];
