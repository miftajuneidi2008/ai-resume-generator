"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import BreadCrumbs from "./BreadCrumbs";
import Footer from "./Footer";
import { ResumeType } from "@/lib/ValidationSchema";
import { useState } from "react";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn } from "@/lib/utils";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import autoSaveResume from "./autoSaveResume";

const ResumeEditor = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;
  const [resumeData, setResumeData] = useState<ResumeType>({});
  const [resumePreview, setResumePreview] = useState(false);
  const { isSaving, hasUnsavedChanges } = autoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges);

  function setSteps(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.Component;
  return (
    <div className="flex min-h-screen grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design Your Resume</h1>
        <p className="text-muted-foreground text-sm">
          Follow the steps below to create your resume. Your progress will be
          saved automatically.
        </p>
      </header>

      <main className="relative flex-1 grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div
            className={cn(
              "w-full overflow-y-auto p-3 md:block md:w-1/2",
              resumePreview && "hidden",
            )}
          >
            <BreadCrumbs currentStep={currentStep} setCurrentStep={setSteps} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(resumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setSteps}
        showPreview={resumePreview}
        setResumePreview={setResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
};

export default ResumeEditor;
