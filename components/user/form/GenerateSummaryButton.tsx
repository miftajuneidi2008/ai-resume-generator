import React from "react";
import { ResumeType } from "@/lib/ValidationSchema";
import LoadingButton from "./LoaadingButton";
import { WandSparklesIcon } from "lucide-react";
import { generateProfessionalSummary } from "@/services/action";
import toast from "react-hot-toast";
export interface GenerateSummaryButtonProps {
  resumeData: ResumeType;
  onGenerateSummary: (summary: string) => void;
}

const GenerateSummaryButton = ({
  resumeData,
  onGenerateSummary,
}: GenerateSummaryButtonProps) => {
  const [loading, setIsLoading] = React.useState(false);

  async function handleClick() {
    try {
      setIsLoading(true);
      const aiResponse = await generateProfessionalSummary(resumeData);
      if (aiResponse.success) {
        onGenerateSummary(aiResponse.data!);
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <LoadingButton
        variant="outline"
        onClick={handleClick}
        loading={loading}
        type="button"
      >
        <WandSparklesIcon className="size-4" />
        Generate (AI)
      </LoadingButton>
    </div>
  );
};

export default GenerateSummaryButton;
