import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";
import Loading from "../atoms/Loading";
import DropdownMenuTrigger from "../atoms/DropdownMenuTrigger";

export default function Dropdown({
  loading,
  onDelete,
}: {
  loading: boolean;
  onDelete: () => void;
}) {
  if (loading) {
    return <Loading />;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onDelete()}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
