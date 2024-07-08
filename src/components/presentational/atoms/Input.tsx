import { Input as ShadcnInput } from "@/components/ui/input";

type InputProps = {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  id,
  name,
  type,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <ShadcnInput
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
