import UserAvatar from "../atoms/UserAvatar";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import DropdownContainer from "@/components/container/molucules/DropdownContainer";

export default function Post({
  post,
  loading,
  fetchPosts,
}: {
  post: any;
  loading: boolean;
  fetchPosts: () => Promise<void>;
}) {
  const { id, username, content } = post;
  return (
    <Card>
      <CardHeader>
        <div className="flex">
          <UserAvatar src="https://github.com/shadcn.png" alt="@shadcn" />
          <CardTitle className="ml-4 self-center">{username}</CardTitle>
          <div className="ml-auto self-center">
            <DropdownContainer
              id={id}
              loading={loading}
              fetchPosts={fetchPosts}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
