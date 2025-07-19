import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {FormField, InferFormData} from "./signInForm";
import {ControllerRenderProps, Path} from "react-hook-form";
import {ZodObject, ZodRawShape} from "zod";

const invalidClassName =
  "invalid:border-red-500 invalid:text-red-500 invalid:ring-red-500 invalid:focus-visible:ring-red-200 invalid:focus-visible:border-red-500";

// 渲染字段
export const renderField = <T extends ZodObject<ZodRawShape>>(
  formField: FormField<T>,
  fieldProps: ControllerRenderProps<InferFormData<T>, Path<InferFormData<T>>>
) => {
  switch (formField.type) {
    case "textarea":
      return (
        <Textarea
          placeholder={formField.placeholder}
          value={String(fieldProps.value ?? "")}
          onChange={fieldProps.onChange}
          aria-label={formField.label}
          autoComplete="off"
          minLength={formField.minLength}
          maxLength={formField.maxLength}
          required={formField.required}
        />
      );

    case "select":
      return (
        <Select onValueChange={fieldProps.onChange} value={String(fieldProps.value ?? "")}>
          <SelectTrigger className="w-full cursor-pointer" aria-label={formField.label}>
            <SelectValue placeholder={formField.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {formField.options?.map((option) => (
              <SelectItem key={option.value} className="cursor-pointer" value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "switch":
      return <Switch checked={fieldProps.value as boolean} className="cursor-pointer" onCheckedChange={fieldProps.onChange} aria-label={formField.label} />;

    case "checkbox":
      // 如果有选项，渲染多个复选框（多选）
      if (formField.options && formField.options.length > 0) {
        const currentValue = (Array.isArray(fieldProps.value) ? fieldProps.value : []) as string[];

        return (
          <div className="space-y-2 flex flex-wrap gap-x-4 gap-y-2">
            {formField.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${formField.name}-${option.value}`}
                  checked={currentValue.includes(String(option.value))}
                  onCheckedChange={(checked) => {
                    const newValue = checked ? [...currentValue, String(option.value)] : currentValue.filter((v) => v !== String(option.value));
                    fieldProps.onChange(newValue);
                  }}
                  aria-label={option.label}
                />
                <Label htmlFor={`${formField.name}-${option.value}`} className="text-sm font-normal">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );
      }

      // 如果没有选项，渲染单个复选框
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={formField.name}
            checked={fieldProps.value as boolean}
            onCheckedChange={fieldProps.onChange}
            aria-label={formField.checkboxText || formField.label}
          />
          <Label htmlFor={formField.name} className="text-sm font-normal">
            {formField.checkboxText || formField.label}
          </Label>
        </div>
      );

    case "radio":
      return (
        <RadioGroup value={String(fieldProps.value ?? "")} onValueChange={fieldProps.onChange} className="flex items-center gap-x-4">
          {formField.options?.map((option) => (
            <div key={option.value} className="flex items-center space-x-1.5">
              <RadioGroupItem value={String(option.value)} id={`${formField.name}-${option.value}`} aria-label={option.label} />
              <Label htmlFor={`${formField.name}-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    case "password":
      return (
        <Input
          type="password"
          placeholder={formField.placeholder}
          value={String(fieldProps.value ?? "")}
          onChange={fieldProps.onChange}
          autoComplete="current-password"
          aria-label={formField.label}
          minLength={formField.minLength}
          maxLength={formField.maxLength}
          pattern={formField.pattern}
          required={formField.required}
          className={invalidClassName}
        />
      );
    case "number":
      return (
        <Input
          type="number"
          placeholder={formField.placeholder}
          value={String(fieldProps.value ?? "")}
          onChange={(e) => {
            const value = e.target.value;
            fieldProps.onChange(value === "" ? 0 : Number(value));
          }}
          autoComplete="off"
          aria-label={formField.label}
          min={formField.min}
          max={formField.max}
          step={formField.step}
          required={formField.required}
          className={invalidClassName}
        />
      );
    case "date":
      return (
        <Input
          type="date"
          placeholder={formField.placeholder}
          value={String(fieldProps.value ?? "")}
          onChange={fieldProps.onChange}
          autoComplete="off"
          aria-label={formField.label}
          min={formField.min}
          max={formField.max}
          required={formField.required}
          className={invalidClassName}
        />
      );
    case "url":
      return (
        <Input
          type="url"
          placeholder={formField.placeholder}
          value={String(fieldProps.value ?? "")}
          onChange={fieldProps.onChange}
          autoComplete="url"
          aria-label={formField.label}
          minLength={formField.minLength}
          maxLength={formField.maxLength}
          pattern={formField.pattern}
          required={formField.required}
          className={invalidClassName}
        />
      );
    case "email":
      return (
        <Input
          type="email"
          placeholder={formField.placeholder}
          value={String(fieldProps.value ?? "")}
          onChange={fieldProps.onChange}
          autoComplete="email"
          aria-label={formField.label}
          minLength={formField.minLength}
          maxLength={formField.maxLength}
          pattern={formField.pattern}
          required={formField.required}
          className={invalidClassName}
        />
      );
    default:
      return (
        <Input
          placeholder={formField.placeholder}
          value={String(fieldProps.value ?? "")}
          onChange={fieldProps.onChange}
          autoComplete="off"
          aria-label={formField.label}
          minLength={formField.minLength}
          maxLength={formField.maxLength}
          pattern={formField.pattern}
          required={formField.required}
          className={invalidClassName}
        />
      );
  }
};
