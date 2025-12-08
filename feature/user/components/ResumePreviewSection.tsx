import { ResumeType } from "@/lib/ValidationSchema";
import React from "react";
import ResumePreview from "./ResumePreview";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";
interface ResumePreviewSectionProps {
  resumeData: ResumeType;
  setResumeData: (data: ResumeType) => void;
  className?: string;
}

const ResumePreviewSection = ({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) => {
  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="absolute top-1 left-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:top-3 lg:left-3 xl:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) => {
            setResumeData({ ...resumeData, colorHex: color.hex });
          }}
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
      </div>
      <div className="bg-secondary flex w-full justify-center overflow-y-auto">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
};

export default ResumePreviewSection;
