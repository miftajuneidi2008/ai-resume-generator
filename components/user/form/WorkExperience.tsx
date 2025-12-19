"use client";
import { Button } from "@/components/ui/button";
import { Form, FormDescription } from "@/components/ui/form";
import { EditorProps, WorkExperienceProps } from "@/lib/types";
import {
  workExperienceSchema,
  WorkExperienceType,
} from "@/lib/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import InputField from "./InputField";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import GenerateWorkExperienceButton from "./GenerateWorkExperienceButton";

export const WorkExperience = ({ resumeData, setResumeData }: EditorProps) => {
  const form = useForm<WorkExperienceType>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperience: resumeData.workExperience || [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workExperience: values.workExperience?.filter(
          (exp) => exp !== undefined,
        ),
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const handleDrag = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  };
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="text-muted-foreground text-sm">
          Add as many work experiences as you want
        </p>
      </div>
      <Form {...form}>
        <form action="" className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDrag}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <WorkExperienceItem
                  key={field.id}
                  id={field.id}
                  index={index}
                  form={form}
                  remove={remove}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              className="cursor-pointer"
            >
              Add Work Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

function WorkExperienceItem({ id, index, form, remove }: WorkExperienceProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  return (
    <div
      className={cn(
        "bg-background space-y-3 rounded-md border p-3",
        isDragging && "relative z-50 cursor-grab shadow-xl",
      )}
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work Experience {index + 1}</span>
        <GripHorizontal
          className="text-muted-foreground size-5 cursor-grab focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <div className="flex justify-center">
        <GenerateWorkExperienceButton
          onWorkExperienceGenerated={(workExperience) => {
            form.setValue(`workExperience.${index}`, workExperience);
          }}
        />
      </div>
      <InputField
        control={form.control}
        name={`workExperience.${index}.position`}
        label="Job Title"
        placeholder="e.g. Software Engineer"
      />
      <InputField
        control={form.control}
        name={`workExperience.${index}.company`}
        label="Company"
        placeholder="e.g. Google"
      />
      <div className="grid grid-cols-2 gap-2">
        <InputField
          control={form.control}
          name={`workExperience.${index}.startDate`}
          label="Start Date"
          placeholder="e.g. 2020"
          type="date"
        />
        <InputField
          control={form.control}
          name={`workExperience.${index}.endDate`}
          label="End Date"
          placeholder="e.g. 2020"
          type="date"
        />
      </div>
      <FormDescription>
        Leave <span>end date</span> empty if you are currently working here.
      </FormDescription>
      <InputField
        control={form.control}
        name={`workExperience.${index}.description`}
        label="Description"
        placeholder="e.g. Google"
        type="text-area"
      />
      <Button
        type="button"
        onClick={() => remove(index)}
        variant={"destructive"}
        className="cursor-pointer"
      >
        Remove
      </Button>
    </div>
  );
}
