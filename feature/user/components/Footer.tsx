import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { steps } from "./steps";
import { FileUserIcon, PenLineIcon } from "lucide-react";
interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showPreview: boolean;
  setResumePreview: (show: boolean) => void;
}
const Footer = ({
  currentStep,
  setCurrentStep,
  showPreview,
  setResumePreview,
}: FooterProps) => {
  const prevStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="flex flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant={"secondary"}
            onClick={prevStep ? () => setCurrentStep(prevStep) : undefined}
            disabled={!prevStep}
          >
            Previos Step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next Step
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setResumePreview(!showPreview)}
          className="md:hidden"
          title={showPreview ? "Show input form" : "Show resume preview"}
        >
          {showPreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
        <div className="flex items-center gap-3">
          <Button variant={"secondary"} asChild>
            <Link href={"/resumes"}>Close</Link>
          </Button>
          <p className="text-muted-foreground text-sm">saving...</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
