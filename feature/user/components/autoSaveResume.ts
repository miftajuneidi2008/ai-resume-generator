import useDebounce from "@/hooks/useDebounce";
import { ResumeType } from "@/lib/ValidationSchema";
import { useEffect, useState } from "react";

export default function autoSaveResume(resumeData: ResumeType) {
  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    async function save() {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLastSavedData(structuredClone(debouncedResumeData));
      setIsSaving(false);
    }
    const hasUnsavedChangeData =
      JSON.stringify(lastSavedData) !== JSON.stringify(debouncedResumeData);
    if (hasUnsavedChangeData && !isSaving && debouncedResumeData) {
      save();
    }
  }, [debouncedResumeData, lastSavedData, isSaving]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
