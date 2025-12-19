"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { GenerateWorkExperience } from "@/services/action";
import {
  generateWorkExperienceSchema,
  GenerateWorkExperienceType,
  WorkExperiences,
  WorkExperienceType,
} from "@/lib/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "./InputField";
import LoadingButton from "./LoaadingButton";
interface GenerateWorkExperienceButtonProps {
  onWorkExperienceGenerated: (workExperience: WorkExperiences) => void;
}
const GenerateWorkExperienceButton = ({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceButtonProps) => {
  const [shotDialog, setShowDialog] = useState(false);
  return (
    <>
      <Button
        type="button"
        variant={"outline"}
        onClick={() => setShowDialog(true)}
      >
        <WandSparklesIcon className="size-4" /> Smart fill (AI){" "}
      </Button>
      <InputDialog
        open={shotDialog}
        onOpenChange={setShowDialog}
        onWorkExperienceGenerated={(workExperience) => {
          onWorkExperienceGenerated(workExperience);
          setShowDialog(false);
        }}
      />
    </>
  );
};

export default GenerateWorkExperienceButton;

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (workExperience: WorkExperiences) => void;
}

export function InputDialog({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: InputDialogProps) {
  const form = useForm<GenerateWorkExperienceType>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
    mode: "onChange",
  });

  async function onSubmit(value: GenerateWorkExperienceType) {
    try {
      const response = await GenerateWorkExperience(value);
      if (response) {
        toast.success("Work Experience Generated Successfully");
        onWorkExperienceGenerated(response);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Work Experience</DialogTitle>
          <DialogDescription>
            Describe work experience and the AI will generate an optimized entry
            for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputField
              control={form.control}
              name="description"
              label="Description"
              type="text-area"
              placeholder="E.G from 2019 t0 2021 I worked at google as fullstack developer"
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
