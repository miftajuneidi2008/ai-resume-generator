import { EditorProps, EducationProps } from "@/lib/types";
import { EducationSchema, EducationType } from "@/lib/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import InputField from "./InputField";
import { GripHorizontal } from "lucide-react";
import { Form, FormDescription } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
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
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { cn } from "@/lib/utils";
import { CSS } from "@dnd-kit/utilities";

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
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "education",
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
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-muted-foreground text-sm">
          Add as many education as you want
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
                <EducationItem
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
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              className="cursor-pointer"
            >
              Add Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Education;

function EducationItem({ id, index, form, remove }: EducationProps) {
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
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Education {index + 1}</span>
        <GripHorizontal
          className="text-muted-foreground size-5 cursor-grab focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <InputField
        control={form.control}
        name={`education.${index}.degree`}
        label="Degree"
        placeholder="e.g. MSc in software engineering "
      />
      <InputField
        control={form.control}
        name={`education.${index}.school`}
        label="School"
        placeholder="e.g. University of Technology"
      />
      <div className="grid grid-cols-2 gap-2">
        <InputField
          control={form.control}
          name={`education.${index}.startDate`}
          label="Start Date"
          placeholder="e.g. 2020"
          type="date"
        />
        <InputField
          control={form.control}
          name={`education.${index}.endDate`}
          label="End Date"
          placeholder="e.g. 2020"
          type="date"
        />
      </div>

      <FormDescription>
        Leave <span>end date</span> empty if you are currently learing here.
      </FormDescription>
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
