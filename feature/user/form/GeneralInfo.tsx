import { useForm } from "react-hook-form";
import { generalInfoSchema, GeneralInfoType } from "@/lib/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import InputField from "../components/InputField";

const GeneralInfo = () => {
  const form = useForm<GeneralInfoType>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: GeneralInfoType) => {
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">General Info</h2>
        <p className="text-muted-foreground text-sm">
          This will not appear on your resume
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <InputField
            control={form.control}
            name="title"
            label="Project Name"
            placeholder="My cool resume."
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default GeneralInfo;
