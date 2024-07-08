import { DropdownMenuItem as ShadcnDropdownMenuItem } from "../../ui/dropdown-menu";

export default function DropdownMenuItem({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <ShadcnDropdownMenuItem onClick={onClick}>
      {children}
    </ShadcnDropdownMenuItem>
  );
}
