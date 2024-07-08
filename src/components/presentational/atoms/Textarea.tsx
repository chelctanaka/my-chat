import { Textarea as ShadcnTextarea } from "../../ui/textarea";

export default function Textarea({
  placeholder,
  className,
  field,
  register,
}: {
  placeholder?: string;
  className?: string;
  field?: any;
  register?: any;
}) {
  return (
    <ShadcnTextarea
      placeholder={placeholder}
      className={className}
      {...field}
      {...register}
    />
  );
}
