"use server";

import {
  generateSummarySchema,
  GenerateSummaryType,
  generateWorkExperienceSchema,
  GenerateWorkExperienceType,
  WorkExperiences,
  WorkExperienceType,
} from "@/lib/ValidationSchema";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateProfessionalSummary(value: GenerateSummaryType) {
  const { jobTitle, workExperience, education, skills } =
    generateSummarySchema.parse(value);

  try {
    const system_message = `
     You are a job resume generator AI. Your task is to write a professional introduction summary for a resume 
     given the users provided data. Only return the summary and do not include any other information in the resource. keep it concise and professional.
    `;

    // FIX: Ensure you are using a supported model name.
    // Try "gemini-1.5-flash" first (with latest SDK), or fallback to "gemini-1.5-flash-001"

    const userMessage = `
    Please generate a professional resume summary from this data:
    Job Title: ${jobTitle || "N/A"} 
    Work Experience: ${workExperience?.map((exp) => `Position: ${exp.position || "N/A"}, Company: ${exp.company || "N/A"}, Start Date: ${exp.startDate || "N/A"}, End Date: ${exp.endDate || "Present"}, Description: ${exp.description || "N/A"}`).join("\n\n")} 
    Education: ${education?.map((edu) => `Degree: ${edu.degree || "N/A"}, School: ${edu.school || "N/A"}, Start Date: ${edu.startDate || "N/A"}, End Date: ${edu.endDate || "Present"}`).join("\n\n")}
    Skills: ${skills || "N/A"}
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: system_message },
        { role: "user", content: userMessage },
      ],
      model: "llama-3.3-70b-versatile", // or "llama-3.1-8b-instant"
    });

    return {
      success: true,
      data: chatCompletion.choices[0]?.message?.content || "",
    };
  } catch (error) {
    console.error("AI Error:", error);
    return { success: false, error: "Failed to generate summary" };
  }
}

export async function GenerateWorkExperience(
  value: GenerateWorkExperienceType,
) {
  const { description } = generateWorkExperienceSchema.parse(value);
  const systemMessage = `
  You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
  Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

  Job title: <job title>
  Company: <company name>
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format, might be inferred from the job title>
  `;

  const userMessage = `
  Please provide a work experience entry from this description:
  ${description}
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
      model: "llama-3.3-70b-versatile", // or "llama-3.1-8b-instant"
    });
    console.log(chatCompletion.choices[0]?.message?.content, "asgsdg");

    if (chatCompletion.choices[0]?.message?.content) {
      const aiResponse = chatCompletion.choices[0]?.message?.content;
      return {
        position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
        company: aiResponse.match(/Company: (.*)/)?.[1] || "",
        description: (
          aiResponse.match(/Description:([\s\S]*)/)?.[1] || ""
        ).trim(),
        startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
        endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
      } satisfies WorkExperiences;
    }
  } catch (error) {
    console.error("AI Error:", error);
    return { success: false, error: "Failed to generate summary" };
  }
}
