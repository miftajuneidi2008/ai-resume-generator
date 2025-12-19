import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  isFile?: boolean;
  type?: string;
}

const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  isFile = false,
  type = "text",
}: InputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {!isFile ? (
            type === "date" ? (
              <FormControl>
                <Input
                  {...fieldProps}
                  type="date"
                  placeholder={placeholder}
                  value={value?.slice(0, 10)}
                  onChange={onChange}
                />
              </FormControl>
            ) : type === "text-area" ? (
              <FormControl>
                <Textarea
                  {...fieldProps}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                />
              </FormControl>
            ) : (
              <FormControl>
                <Input
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  {...fieldProps}
                />
              </FormControl>
            )
          ) : (
            <FormControl>
              <Input
                {...fieldProps}
                type="file"
                placeholder={placeholder}
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files && event.target.files[0];
                  // Update react-hook-form state
                  onChange(file);
                }}
              />
            </FormControl>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
