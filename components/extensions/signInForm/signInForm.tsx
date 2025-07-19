"use client";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {cn} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCallback, useMemo} from "react";
import {DefaultValues, Path, Resolver, useForm} from "react-hook-form";
import z, {type ZodObject, type ZodRawShape} from "zod";
import {renderField} from "./render";

// 从 Zod schema 推断表单数据类型
export type InferFormData<T extends ZodObject<ZodRawShape>> = z.infer<T>;

// 从 Zod schema 推断字段名称
type InferFieldNames<T extends ZodObject<ZodRawShape>> = keyof InferFormData<T> & string;

// 从 Zod schema 推断字段值类型
type InferFieldValue<T extends ZodObject<ZodRawShape>, K extends InferFieldNames<T>> = InferFormData<T>[K];

// 表单字段类型
export interface FormField<T extends ZodObject<ZodRawShape>> {
  name: Path<InferFormData<T>>;
  label: string;
  type: "text" | "email" | "password" | "number" | "textarea" | "select" | "switch" | "checkbox" | "radio" | "date" | "url";
  placeholder?: string;
  defaultValue?: InferFieldValue<T, InferFieldNames<T>>;
  options?: { label: string; value: string | number }[];
  description?: string;
  checkboxText?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  required?: boolean;
}

// 组件属性接口
export interface ResourceDialogProps<T extends ZodObject<ZodRawShape>> {
  formFields: FormField<T>[];
  initialData?: Partial<InferFormData<T>>;
  formSchema: T;
  onSubmit: (data: InferFormData<T>) => void;
  title?: string;
  subTitle?: string;
  submitButtonText?: string;
  className?: string;
  // 配置oauth
  oauth?: Array<{
    name: string;
    icon: React.ReactNode;
    onClick: () => void;
  }>;
  footer?: React.ReactNode;
}


export function SignInForm<T extends ZodObject<ZodRawShape>>({
  formFields,
  formSchema,
  onSubmit,
  submitButtonText = "Submit",
  oauth,
  footer,
  className
}: ResourceDialogProps<T>) {
  type FormData = InferFormData<T>;

  // 计算默认值，使用更精确的类型
  const defaultValues = useMemo((): DefaultValues<FormData> => {
    const result = {} as DefaultValues<FormData>;

    for (const field of formFields) {
      if (field.defaultValue !== undefined) {
        (result as any)[field.name] = field.defaultValue;
      } else {
        // 根据字段类型提供合适的默认值
        let defaultValue: any;

        if (field.type === "checkbox" && field.options && field.options.length > 0) {
          defaultValue = [];
        } else if (field.type === "checkbox" || field.type === "switch") {
          defaultValue = false;
        } else if (field.type === "number") {
          defaultValue = 0;
        } else if (field.type === "select" || field.type === "radio") {
          defaultValue = "";
        } else {
          defaultValue = "";
        }

        (result as any)[field.name] = defaultValue;
      }
    }

    return result;
  }, [formFields]);


  const form = useForm<InferFormData<T>>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema) as Resolver<InferFormData<T>>,
    defaultValues
  });



  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const isValid = await form.trigger();
      if (isValid) {
        const values = form.getValues();
        onSubmit(values);
      }
    },
    [form, onSubmit]
  );

  return (
    <>
      <Form {...form}>
        <form className={cn("space-y-5 px-6", className)}>
          {formFields.map((formField) => {
            return (
              <FormField
                key={formField.name}
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>{renderField<T>(formField, field)}</FormControl>
                    {formField.description && <FormDescription>{formField.description}</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Button type="submit" className="w-full cursor-pointer" onClick={handleSubmit}>
            {submitButtonText}
          </Button>
        </form>
      </Form>
      {oauth && oauth.length > 0 && (
        <div className="flex flex-col gap-6 mt-10">
          {oauth.length > 0 && (
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
            {oauth?.map((item) => (
              <Button key={item.name} variant="outline" className="w-full cursor-pointer" onClick={item.onClick}>
                {item.icon}
                {item.name}
                <span className="sr-only">{item.name}</span>
              </Button>
            ))}
          </div>
          {footer}
        </div>
      )}
    </>
  );
}
