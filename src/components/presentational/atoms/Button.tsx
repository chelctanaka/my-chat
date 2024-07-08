import { Button as ShadcnButton } from "../../ui/button";

type ButtonProps = {
  type?: "submit" | "button";
  disabled?: boolean;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export default function Button({
  type = "button",
  disabled = false,
  variant = "default",
  children,
  onClick,
  className,
}: ButtonProps) {
  return (
    <ShadcnButton
      type={type}
      disabled={disabled}
      variant={variant}
      onClick={onClick}
      className={className}
    >
      {children}
    </ShadcnButton>
  );
}
