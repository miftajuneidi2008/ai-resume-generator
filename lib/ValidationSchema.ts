import { generateCodeChallenge } from "better-auth";
import { z } from "zod";
const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoType = z.infer<typeof generalInfoSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginType = z.infer<typeof loginSchema>;

export const SignupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignupType = z.infer<typeof SignupSchema>;

// personal info schema

export const personalInfoSchema = z.object({
  photo: z.string().optional().nullable().or(z.literal("")),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalInfoType = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperience: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export type WorkExperienceType = z.infer<typeof workExperienceSchema>;
export type WorkExperiences = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperience"]
>[number];

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .min(1, "Description is required")
    .min(20, "Description must be at least 20 characters long"),
});
export type GenerateWorkExperienceType = z.infer<
  typeof generateWorkExperienceSchema
>;

export const EducationSchema = z.object({
  education: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});

export type EducationType = z.infer<typeof EducationSchema>;

export const SkillSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});
export type SkillType = z.infer<typeof SkillSchema>;

export const SummarySchema = z.object({
  summary: optionalString,
});
export type SummaryType = z.infer<typeof SummarySchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...EducationSchema.shape,
  ...SkillSchema.shape,
  ...SummarySchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
});

export type ResumeType = z.infer<typeof resumeSchema> & {
  id?: string;
};

export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...EducationSchema.shape,
  ...SkillSchema.shape,
});

export type GenerateSummaryType = z.infer<typeof generateSummarySchema>;
