import { saveResume } from "@/components/user/action";
import useDebounce from "@/hooks/useDebounce";
import { ResumeType } from "@/lib/ValidationSchema";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useAutoSaveResume(resumeData: ResumeType) {
  const searchParams = useSearchParams();

  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [resumeId, setResumeId] = useState(resumeData.id);
  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setError(false);
        const newData = structuredClone(debouncedResumeData);

        const upadatedResume = await saveResume({
          ...newData,
          ...(lastSavedData.photo?.toString() === newData.photo?.toString() && {
            photo: undefined,
          }),
          id: resumeId,
        });

        setResumeId(upadatedResume.id);
        setLastSavedData(newData);
        if (searchParams.get("resumeId") !== upadatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", upadatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error: any) {
        setError(true);
        toast.error(error || "Something went wrong");
      } finally {
        setIsSaving(false);
      }
    }

    const hasUnsavedChangeData =
      JSON.stringify(lastSavedData) !== JSON.stringify(debouncedResumeData);

    if (hasUnsavedChangeData && !isSaving && debouncedResumeData && !error) {
      save();
    }
  }, [
    debouncedResumeData,
    lastSavedData,
    isSaving,
    resumeId,
    error,
    searchParams,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
