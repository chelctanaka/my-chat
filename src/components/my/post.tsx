import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Post({
  username,
  postid,
  content,
  onDelete,
}: {
  username: string;
  postid: number;
  content: string;
  onDelete: (postid: number) => Promise<void>;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle className="ml-4 self-center">{username}</CardTitle>
          <div className="ml-auto self-center">
            {/* modal={false} で open 時にスクロールバー分ずれない */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onDelete(postid)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
