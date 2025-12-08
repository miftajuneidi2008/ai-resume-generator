import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { EditorProps } from "@/lib/types";
import { SkillSchema, SkillType } from "@/lib/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { Textarea } from "@/components/ui/textarea";

const Skill = ({ resumeData, setResumeData }: EditorProps) => {
  const form = useForm<SkillType>({
    resolver: zodResolver(SkillSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });
  useEffect(() => {
    const { unsubscribe } = form.watch(async (value) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        skills:
          value.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-muted-foreground text-sm">What are you good at?</p>
      </div>
      <Form {...form}>
        <form action="" className="space-y-3">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Next js, React js, Node js, etc."
                    onChange={(e) => {
                      const skills = e.target.value
                        .split(",")
                        .map((skill) => skill.trim());
                      field.onChange(skills);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  <span>Separate each skill with a comma.</span>
                </FormDescription>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Skill;
