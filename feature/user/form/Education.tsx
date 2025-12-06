import { EditorProps } from "@/lib/types";
import { EducationSchema, EducationType } from "@/lib/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const Education = ({ resumeData, setResumeData }: EditorProps) => {
  const form = useForm<EducationType>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      education: resumeData.education || [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (value) => {
      const isValid = await form.trigger();
      if (!isValid) {
        return;
      }
      setResumeData({
        ...resumeData,
        education: value.education?.filter((edu) => edu !== undefined),
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });
  return <div>Education</div>;
};

export default Education;
